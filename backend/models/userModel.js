const mongoose = require("mongoose");

// Schema
const userSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
        min: 0
    }
});

// Model
const User = mongoose.model("User", userSchema);

// Export
module.exports = User;