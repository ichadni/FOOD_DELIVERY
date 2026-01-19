const express = require('express');
const router = express.Router();

router.post('/displaydata', (req, res) => {
  try {
    console.log(global.Food_items,global.Food_category);
    res.json({Food_items: global.Food_items, Food_category: global.Food_category});
    return;
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
});

module.exports = router;