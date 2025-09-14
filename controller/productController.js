const mongoose = require("mongoose")
const productModel = require("../model/productModel")

// ✅ Create Product
const createProduct = async (req, res) => {
    try {
        const { name, price, desc, quantity, category } = req.body
        const newData = productModel({
            name,
            price,
            desc,
            quantity,
            prImage: req.file.filename,
            category
        })
        await newData.save()
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// ✅ Read All Products (with optional category filter)
const readProduct = async (req, res) => {
    try {
        const { category } = req.query || {}
        let filter = {}
        
        if (category && category !== "All Categories") {
            filter = { category: category }
        }

        const products = await productModel.find(filter)
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// ✅ Read Single Product
const readSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// ✅ Update Product
const updateProduct = async (req, res) => {
    try {
        const { name, price, desc, quantity, category } = req.body
        const updateFields = {
            name,
            price,
            desc,
            quantity,
            category
        }
        
        if (req.file) {
            updateFields.prImage = req.file.filename
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// ✅ Delete Product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id)
        
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { 
    createProduct, 
    readProduct, 
    readSingleProduct, 
    updateProduct, 
    deleteProduct 
}