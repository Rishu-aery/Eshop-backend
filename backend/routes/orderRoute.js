const express = require('express');
const router = express.Router();
const Order = require("../models/orderModel.js");


router.get(`/`, async (req, res) => {
    const orderList = await Order.find();

    if (!orderList) {
        return res.status(500).json({
            success: false
        });
    }
    res.send(orderList);
});

module.exports = router;