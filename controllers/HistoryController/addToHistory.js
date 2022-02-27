const History = require("../../models/History.model");

const addToHistory = async (req, res) => {
  const { userId, videoId } = req.body;
  console.log(userId, videoId);
  try {
    const history = await History.findOne({ userId: userId });
    if (history) {
      let videosArr = history.videos;
      if(videosArr.includes(videoId)) {
        videosArr.pop(videoId);
      }
      videosArr.push(videoId);
      const newHistoryData = {
        userId: userId,
        videos: videosArr,
      };
      const newHistory = await History.findByIdAndUpdate(
        history._id,
        { $set: newHistoryData },
        { new: true }
      );
      const savedHistory = await newHistory.save();
      res.status(200).json({ success: true, videos: savedHistory.videos.reverse() });
    } else {
      const newVideosArr = [videoId];
      const newHistory = new History({
        userId: userId,
        videos: newVideosArr,
      });
      const savedHistory = await newHistory.save();
      res.status(200).json({ success: true, videos: savedHistory.videos.reverse() });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { addToHistory };
