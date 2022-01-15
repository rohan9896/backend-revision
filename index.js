const express = require("express");
var cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { connectDb } = require("./services/databaseConnection");

const authRoute = require("./router/auth.router");
const userRoute = require("./router/users.router");

app.use(express.json());
dotenv.config();
app.use(cors());

connectDb();

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.listen(3000, () => {
  console.log("server started");
});
