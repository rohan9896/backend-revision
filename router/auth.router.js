const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

//REGISTER
router.route("/register").post(async (req, res) => {
  const data = req.body;
  const newUser = new User({
    username: data.username,
    email: data.email,
    password: CryptoJS.AES.encrypt(
      data.password,
      process.env.SECRET
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
});

//LOGIN
router.route("/login").post(async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    !user &&
      res.status(401).json({ message: "Please check username or password!!" });

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
    const passwordFromDb = bytes.toString(CryptoJS.enc.Utf8);

    passwordFromDb !== data.password &&
      res.status(401).json({ message: "Please check username or password!!" });

    const authToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({...info, authToken});
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
});

module.exports = router;
