const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const History = require("../models/History.model");

const {
  getUserHistory,
} = require("../controllers/HistoryController/getUserHistory");
const {
  addToHistory,
} = require("../controllers/HistoryController/addToHistory");

const {
  verifyUserExists,
  verifyVideoExists,
} = require("../middlewares/verifyUserAndVideoExists");

router.use(verify);

/**
 * @route - /history/add-to-history
 * @reqbody - userId, videoId
 * @access - Private(user)
 * @desc - add video to history
 */
router.post(
  "/add-to-history",
  verifyUserExists,
  verifyVideoExists,
  addToHistory
);

/**
 * @route - /history
 * @reqbody - userId
 * @access - Private(user)
 * @desc - get user history
 */

router.post("/", verifyUserExists, getUserHistory);

module.exports = router;
