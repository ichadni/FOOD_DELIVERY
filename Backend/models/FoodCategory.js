const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodCategorySchema = new mongoose.Schema({
  CategoryName: { type: String, required: true }
});
module.exports = mongoose.model('FoodCategory', FoodCategorySchema);