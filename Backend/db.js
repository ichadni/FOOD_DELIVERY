const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://goFood:mern123@cluster0.efo2ytl.mongodb.net/foodDeliveryDB?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI); 
        console.log("Connected to MongoDB Successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

module.exports = mongoDB;
