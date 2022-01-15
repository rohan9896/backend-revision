const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch(error) {
        console.log("Database connection failed");
    }
};

module.exports = {connectDb};