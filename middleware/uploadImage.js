const multer = require("multer")

const storeImage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "images")
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const uploadStore = multer({
    storage: storeImage
})

module.exports = uploadStore