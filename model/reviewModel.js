const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const reviewSchema = new mongoose.Schema({
    product: {  // Changed from productId to product
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",  // Should match your product model name
        required: true
    },
    comments: [commentSchema]
});

module.exports = mongoose.model("review", reviewSchema);