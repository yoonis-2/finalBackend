const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req,res,next) => {
    const token = req.headers["authorization"]
    if(!token){
        return res.status(401).json({meassge: "no token provided"})
    }
    try{
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_Secret)
        req.user = decoded
        next()

    }catch(error){
         res.status(401).json({message: "invalid token"})
    }

}

const isAdmin = (req,res,next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "forbidden"})
    }
    next()
}

module.exports = {verifyToken, isAdmin}