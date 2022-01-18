const express = require("express");
var cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { connectDb } = require("./utils/databaseConnection");

const authRouter = require("./router/auth.router");
const userRouter = require("./router/users.router");
const videoRouter = require("./router/video.router");
const commonRouter = require("./router/common.router");

app.use(express.json());
dotenv.config();
app.use(cors());

connectDb();

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/common", commonRouter);

app.listen(3000, () => {
  console.log("server started");
});
