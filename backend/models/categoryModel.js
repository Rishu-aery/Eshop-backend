const mongoose = require("mongoose");

// Schema
const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
        min: 0
    }
});

// Model
const Category = mongoose.model("Category", categorySchema);

// Export
module.exports = Category;