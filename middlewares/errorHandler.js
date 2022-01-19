const errorHandler = (err, req, res, next) => {
  console.error(err); //logger should be used here at scale
  res.status(500).json({
    success: false,
    message: err.message,
  });
};

module.exports = { errorHandler };
