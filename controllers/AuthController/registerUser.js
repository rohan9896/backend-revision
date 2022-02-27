const User = require("../../models/User.model");
const CryptoJS = require("crypto-js");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};

module.exports = {registerUser};
