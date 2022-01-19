const router = require("express").Router();
const Video = require("../models/Video.model");
const verify = require("../middlewares/verifyToken");

router.use(verify);

//CREATE
router.post("/", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newVideo = new Video(req.body);
      const savedVideo = await newVideo.save();
      res.status(201).json({ savedVideo, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  } else {
    res.status(403).json({
      message: "You are not allowed to do this operation!",
      success: false,
    });
  }
});

module.exports = router;
