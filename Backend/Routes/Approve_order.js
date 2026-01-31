const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/approve-order', async (req, res) => {
  const { email, orderId } = req.body; // use the orderId sent from frontend

  try {
    const result = await Order.updateOne(
      { email, "order_data._id": orderId }, // use orderId directly
      { $set: { "order_data.$.status": "Confirmed" } }
    );

    console.log("Approve result:", result);

    res.json({ success: result.modifiedCount === 1 });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
