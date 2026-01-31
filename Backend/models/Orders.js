const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for each item in an order
const ItemSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    size: String,
    img: String
}, { _id: false }); // items inside order don't need _id

// Schema for each order in order_data
const OrderEntrySchema = new Schema({
    order_date: { type: Date, default: Date.now },
    items: [ItemSchema],
    deliveryDetails: {
        address: String,
        phone: String
    },
    status: { type: String, default: "pending" }
}, { _id: true }); // <-- this gives each order a unique _id

// Main Orders schema
const OrderSchema = new Schema({
    email: { type: String, required: true, unique: true },
    order_data: [OrderEntrySchema] // now an array of subdocuments
});

module.exports = mongoose.model('Order', OrderSchema);
