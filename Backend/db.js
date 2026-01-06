const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://goFood:heartt123***@cluster0.efo2ytl.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      family: 4, 
    });

    console.log("Connected to MongoDB Successfully");

    const fetched_data = mongoose.connection.db.collection("Food_items");
    fetched_data.find({}).toArray( function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
    

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = mongoDB;
