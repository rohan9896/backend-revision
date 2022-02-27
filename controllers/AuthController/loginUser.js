const User = require("../../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email: email });

    //if email doesnt exists
    if (!currentUser) {
      res
        .status(401)
        .json({ message: "user doesn't exists!!", success: false });
    }

    //decypt password
    const bytes = CryptoJS.AES.decrypt(currentUser.password, process.env.SECRET);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    //if password coming from client doesnt matches the password from db(decypted password)
    if (originalPassword !== password) {
      res
        .status(401)
        .json({ message: "Please check email or password!!", success: false });
    } else {
    // Create new token for user
      const authToken = jwt.sign(
        { id: currentUser._id, isAdmin: currentUser.isAdmin },
        process.env.SECRET,
        { expiresIn: "5d" }
      );

      //remove password from currentUser and send rest of the info
      const { password, ...info } = currentUser._doc;
      res.status(200).json({ ...info, authToken, success: true });
    }
  } catch (error) {
    res.status(500).json({
        message: "Server error",
        error,
       success: false
      });
  }
};

module.exports = {loginUser};
