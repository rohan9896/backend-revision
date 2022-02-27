const router = require("express").Router();

const {registerUser} = require("../controllers/AuthController/registerUser");
const {loginUser} = require("../controllers/AuthController/loginUser");

//REGISTER
router.route("/register").post(registerUser);

//LOGIN
router.route("/login").post(loginUser);

module.exports = router;
