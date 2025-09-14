const Product = require("../model/productModel");

// Add a rating to a product
const addRating = async (req, res) => {
    try {
        const { productId, rating, comment, userName } = req.body;
        
        // For now, we'll use a simple user identifier
        // In a real app, you'd get this from authentication
        const userId = "guest_" + Date.now(); // Create a unique guest ID

        // Validate input
        if (!productId || !rating) {
            return res.status(400).json({ message: "Product ID and rating are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if user already rated this product
        // We'll use a simple approach for guest users
        const userIdentifier = userId; // For guests, we'll use the generated ID

        // Add new rating
        product.ratings.push({
            userId: userIdentifier,
            userName: userName || "Anonymous",
            rating,
            comment: comment || ""
        });

        // Calculate new average rating
        product.calculateAverageRating();

        // Save the product
        await product.save();

        res.status(200).json({
            message: "Rating added successfully",
            averageRating: product.averageRating,
            totalRatings: product.totalRatings
        });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get ratings for a product
const getRatings = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId).select('ratings averageRating totalRatings');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            ratings: product.ratings,
            averageRating: product.averageRating,
            totalRatings: product.totalRatings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addRating, getRatings };