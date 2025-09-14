const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")
const uploadImage = require("../middleware/uploadImage")

// Create product
router.post("/create/product", uploadImage.single("img"), productController.createProduct)

// Get all products (with optional category query parameter)
router.get("/read/product", productController.readProduct)

// Get single product
router.get("/readSingle/product/:id", productController.readSingleProduct)

// Update product
router.put("/update/product/:id", uploadImage.single("img"), productController.updateProduct)

// Delete product
router.delete("/delete/product/:id", productController.deleteProduct)

module.exports = router