const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const productRouter = require("./Router/productRouter")
const customerRouter = require("./Router/customerRoutes")
const orderROuter = require("./Router/orderRouter")
const adminROuter = require("./Router/adminRouter")
const reviewRouter = require("./Router/reviewRouter")

const app = express()
const PORT = process.env.port || 5000

app.use(express.json())
app.use(cors())

app.use(productRouter)
app.use(customerRouter)
app.use(orderROuter)
app.use(adminROuter)
app.use(reviewRouter)

mongoose.connect(process.env.db_url)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err))

app.use("/allImages", express.static("images"))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))