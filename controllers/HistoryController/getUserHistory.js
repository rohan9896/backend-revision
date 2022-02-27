const History = require("../../models/History.model");

const getUserHistory = async (req, res) => {
  const { userId } = req.body;

  try {
    const history = await History.findOne({ userId: userId });

    if (history) {
      const videos = await history.populate("videos");
      res.status(200).json({ success: true, videos: videos });
    } else {
      res.status(404).json({ success: false, videos: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { getUserHistory };
