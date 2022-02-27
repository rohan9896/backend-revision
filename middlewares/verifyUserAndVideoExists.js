const User = require("../models/User.model");
const Video= require("../models/Video.model");

const verifyUserExists = async (req, res, next) => {
    const {userId} = req.body;
    try {
        const user = await User.findOne({_id: userId});
        !user && res.status(404).json({success: false, message: "User not found"});
        next();
    } catch(error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
}

const verifyVideoExists = async (req, res, next) => {
    const {videoId} = req.body;
    try {
        const video = await Video.findOne({_id: videoId})
        !video && res.status(404).json({success: false, message: "Video not found"});
        next();
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
}

module.exports = {verifyUserExists, verifyVideoExists};