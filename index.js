const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoute = require("./router/auth.router");

app.use(express.json());
dotenv.config();
app.use(cors());


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log("db connected");
}).catch((e) => {
    console.log(e.toString());
})

app.get('/', (req, res) => {
    res.send('Hello Express app!')
});

app.use("/api/v1/auth", authRoute);
  
app.listen(3000, () => {
    console.log('server started');
});