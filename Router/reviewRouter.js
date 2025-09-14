const express = require("express");
const router = express.Router();
const ratingController = require("../controller/reviewController");

// Add a rating to a product
router.post("/rating", ratingController.addRating);

// Get ratings for a product
router.get("/ratings/:productId", ratingController.getRatings);

module.exports = router;