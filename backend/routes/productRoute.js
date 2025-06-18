const express = require('express');
const router = express.Router();
const { Product } = require("../models/productModel.js");


router.get(`/`, async (req, res) => {

    const productList = await Product.find();

    if (!productList) {
        return res.status(500).json({
            success: false
        });
    }
    res.send(productList);
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log("body---------", body);
    const product = await Product.create(body);

    if (!product) {
      throw new Error("Error Creating product!");
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;