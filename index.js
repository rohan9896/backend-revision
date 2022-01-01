const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

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
  
app.listen(3000, () => {
    console.log('server started');
});