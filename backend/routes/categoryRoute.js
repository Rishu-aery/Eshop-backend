const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel.js");

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    return res.status(404).json({
      success: false,
      message: "Not Found!"
    });
  }
  res.send(categoryList);
});

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(500).json({
      success: false,
      message: "Category Not Found!"
    });
  }
  res.send(category);
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const category = await Category.create(body);

    if (!category) {
      throw new Error("Error Creating Category!");
    }
    res.status(200).json({
      success: true,
      data: category
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCategory = req.body;

    const options = {
      new: true
    }

    const category = await Category.findByIdAndUpdate({"_id": id}, updatedCategory, options);

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category Not Found!"
      })
    }

    res.status(200).json({
      success: true,
      data: category
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
});

router.delete("/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (category) {
      res.status(200).json({
        success: true,
        message: `Category Deleted Successfully with id ${id}`
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category Not Found!"
      });
    }    
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Error While deleting the cxategory!",
      err: error
    });
  }
});

module.exports = router;
