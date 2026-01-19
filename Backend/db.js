const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://goFood:heartt123***@cluster0.efo2ytl.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      family: 4, 
    });

    console.log("Connected to MongoDB Successfully");

   const fetched_data = await mongoose.connection.db
  .collection("Food_items")
  .find({})
  .toArray();
  const Food_category = await mongoose.connection.db
  .collection("Food_category")
  .find({})
  .toArray();
global.Food_category = Food_category;
global.Food_items = fetched_data;
console.log("Food items loaded:", global.Food_items.length);
console.log("Food categories loaded:", global.Food_category.length);

    

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = mongoDB;
