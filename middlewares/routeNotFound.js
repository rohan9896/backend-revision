const routeNotFoundHandler = ((req, res) => {
  res.status(404).json({ success: false, message: "route not found!" });
});

module.exports = { routeNotFoundHandler };
