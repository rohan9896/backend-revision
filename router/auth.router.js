const router = require("express").Router();
const User = require("../models/User.model");

//REGISTER
router.route("/register").post(async (req, res) => {
  const data = req.body;
  const newUser = new User({
    username: data.username,
    email: data.email,
    password: data.password,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (e) {
      res.status(500).json({
          message: "Server error",
          e
      })
  }
});

module.exports = router;
