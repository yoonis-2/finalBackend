const express = require("express")
const router = express.Router()
const productController = require("../controller/productController")
const uploadImage = require("../middleware/uploadImage")

router.post("/create/product", uploadImage.single("img"), productController.createProduct)

// get
router.post("/read/product", productController.readProduct)

// readsingledata
router.get("/readSingle/product/:id", productController.readSingleProduct)

// updateProduct

router.put("/update/product/:id",uploadImage.single("img"), productController.updateProduct)

// deleteProduct
router.delete("/delete/product/:id", productController.deleteProduct)

module.exports = router
