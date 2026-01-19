const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Save order
router.post('/orderdata', async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    // Prepare order object
    const orderEntry = {
      order_date: order_date, 
      items: order_data.map(item => ({ ...item, qty: Number(item.qty) }))
    };

    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      // First order for this user
      await Order.create({
        email,
        order_data: [orderEntry]
      });
    } else {
      // Append new order
      await Order.updateOne(
        { email },
        { $push: { order_data: orderEntry } }
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get all orders for a user
router.post('/myorder', async (req, res) => {
  try {
    const myData = await Order.findOne({ email: req.body.email });
    if (!myData) return res.json({ orderData: [] });

    const formattedOrders = myData.order_data.map(order => ({
      order_date: order.order_date,
      order_data: order.items
    }));

    res.json({ orderData: formattedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
