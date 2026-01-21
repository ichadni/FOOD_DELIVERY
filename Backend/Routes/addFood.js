const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");
const FoodCategory = require("../models/FoodCategory");

router.post("/addFood", async (req, res) => {
    try {
        const { name, CategoryName, price, img, description } = req.body;


        if (!name || !CategoryName || !price || !img) {
            return res.status(400).json({
                success: false,
                message: "All required fields (name, category, price, img) must be filled"
            });
        }


        const newFood = new FoodItem({ name, CategoryName, price, img, description });
        await newFood.save();


        const categoryExists = await FoodCategory.findOne({ CategoryName });
        if (!categoryExists) {
            const newCategory = new FoodCategory({ CategoryName });
            await newCategory.save();
        }

        return res.status(201).json({
            success: true,
            message: "Food item added successfully",
            food: newFood
        });
    } catch (error) {
        console.error("Error adding food item:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while adding food item"
        });
    }
});

module.exports = router;
