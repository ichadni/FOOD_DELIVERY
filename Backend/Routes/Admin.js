const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.get('/pending-orders', async (req, res) => {
  try {
    const orders = await Order.find({}, { email: 1, order_data: 1 });

    const pendingOrders = [];

    orders.forEach(user => {
      user.order_data.forEach(order => {
        if (order.status === "pending") {
          pendingOrders.push({
            email: user.email,
            order
          });
        }
      });
    });

    res.json(pendingOrders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get('/pending-count', async (req, res) => {
  try {
    const orders = await Order.find({}, { order_data: 1 });

    let count = 0;

    orders.forEach(user => {
      user.order_data.forEach(order => {
        if (order.status === "pending") {
          count++;
        }
      });
    });

    res.json({ count }); // return as JSON object
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;