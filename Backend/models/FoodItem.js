const mongoose = require('mongoose');
const { Schema } = mongoose;


const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  CategoryName: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  description: { type: String }
});
module.exports = mongoose.model('FoodItem', FoodItemSchema);