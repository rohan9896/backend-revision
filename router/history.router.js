const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const History = require("../models/History.model");

router.use(verify);

/**
 * req body param - userId, videoId
 */
router.route('/add-to-history').post(async (req, res) => {
    const {userId, videoId} = req.body;
    try {
        const history = await History.find({userId: userId});

        if(history) {
            const existingVideosArr = history.videos;
            const newVideosArr = [...existingVideosArr, videoId];
            const newHistoryData = {
                userId: userId,
                videos: newVideosArr,
            }
            const newHistory = await History.findByIdAndUpdate(history._id, 
                { $set: newHistoryData },
                { new: true }
            );
            const savedHistory = newHistory.save();
            res.status(200).json({success: true, savedHistory});
        } else {
            const newVideosArr = [videoId];
            const newHistory = new History({
                userId: userId,
                videos: newVideosArr,
            });
            const savedHistory = newHistory.save();
            res.status(200).json({success: true, savedHistory});
        }
    } catch (err) {

    }


})