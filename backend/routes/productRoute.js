const express = require('express');
const router = express.Router();
const { Product } = require("../models/productModel.js");


router.get(`/`, async (req, res) => {

    console.log("Product------------", Product);
    const productList = await Product.find();

    if (!productList) {
        return res.status(500).json({
            success: false
        });
    }
    res.send(productList);
});

router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });

    product.save().then((insertedProduct) => {
        res.status(200).json(insertedProduct);
    }).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

module.exports = router;