const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const verify = require("../utils/verifyToken");

router.use(verify);

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    //if passoword is to be updated(passoword is in payload), we need to encrypt it
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        data.password,
        process.env.SECRET
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      updatedUser
        ? res
            .status(200)
            .json({
              updatedUser,
              message: "Information updated successfully!",
              success: true,
            })
        : res
            .status(404)
            .json({ message: "user doesnt exist!", success: false });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  } else {
    res
      .status(403)
      .json({ message: "You can update only your account!", success: false });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "User deleted successfully!", success: false });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  } else {
    res
      .status(403)
      .json({ message: "You can delete only your account!", success: false });
  }
});

//GET
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json({ info, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
});

//GET ALL(ADMIN-ONLY)
router.get("/", async (req, res) => {
  const query = req.query.new; //eg - /all?new=true
  if (req.user.isAdmin) {
    try {
      const users = query ? await User.find().limit(10) : await User.find();
      res.status(200).json({ users, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  } else {
    res
      .status(403)
      .json({
        message: "You are not allowed to see all users!",
        success: false,
      });
  }
});

//GET USER STATS(ADMIN-ONLY)
router.get("stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ data, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
});

module.exports = router;
