const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const {registerUser} = require("../controllers/registerUser");
const {loginUser} = require("../controllers/loginUser");

//REGISTER
router.route("/register").post(registerUser);

//LOGIN
router.route("/login").post(loginUser);

module.exports = router;
