const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");
const FoodCategory = require("../models/FoodCategory");

// Fetch all food items and categories
router.get("/displaydata", async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    const foodCategories = await FoodCategory.find({});

    res.json({
      Food_items: foodItems,
      Food_category: foodCategories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
