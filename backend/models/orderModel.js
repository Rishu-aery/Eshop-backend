const mongoose = require("mongoose");

// Schema
const orderSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
        min: 0
    }
});

// Model
const Order = mongoose.model("Order", orderSchema);

// Export
module.exports = Order;