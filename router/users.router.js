const router = require("express").Router();
const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
const verify = require("../services/verifyToken");

//UPDATE
router.put("/:id", verify, async(req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {

        //if passoword is to be updated(passoword is in payload), we need to encrypt it
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                data.password,
                process.env.SECRET
              ).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            updatedUser ? res.status(200).json({updatedUser, message: "Information updated successfully!"}) : res.status(404).json({message: "user doesnt exist!"});
        } catch(error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json({message: "You can update only your account!"});
    }
});

//DELETE
router.delete("/:id", verify, async(req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "User deleted successfully!"});
        } catch(error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json({message: "You can delete only your account!"});
    }
});

//GET
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch(error) {
        res.status(500).json(error);
    }
});


//GET ALL(ADMIN-ONLY)
router.get("/", verify, async(req, res) => {
    const query = req.query.new; //eg - /all?new=true
    if(req.user.isAdmin) {
        try {
            const users = query ? await User.find().limit(10) : await User.find();
            res.status(200).json(users);
        } catch(error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json({message: "You are not allowed to see all users!"});
    }
});

//GET USER STATS(ADMIN-ONLY)

module.exports = router;
