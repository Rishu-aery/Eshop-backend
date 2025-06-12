const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel.js");

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    return res.status(500).json({
      success: false,
    });
  }
  res.send(categoryList);
});

router.post("/", async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    category = await category.save();

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Ctegory cannot be created!",
      });
    }

    res.status(201).json({
      data: category,
      success: true,
    });
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
});

module.exports = router;
