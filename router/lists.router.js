const router = require("express").Router();
const List = require("../models/List.model");
const verify = require("../utils/verifyToken");

router.use(verify);

//CREATE
router.post("/", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);
      const savedList = await newList.save();
      res.status(201).json({ savedList, success: true });
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
