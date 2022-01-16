const router = require("express").Router();
const Movie = require("../models/Movie.model");
const verify = require("../utils/verifyToken");

router.use(verify);

//CREATE
router.post("/", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newMovie = new Movie(req.body);
      const savedMovie = await newMovie.save();
      res.status(201).json({ savedMovie, success: true });
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

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "Movie has been deleted!", success: true });
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

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ updatedMovie, success: true });
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

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json({ movie, success: true });
    } else {
      res.status(404).json({ message: "Movie not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
});

router.get("/random", async (req, res) => {
    //eg - "/random?type=series"
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json({movie, success: true});
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
});

router.get("/", async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json({movies, success: true})
        } catch (error) {
          res.status(500).json({ error, success: false });
        }
    } else {
        res.status(403).json({success: false, message: "You are not allowed to perform this operation!"})
    }
  });

module.exports = router;
