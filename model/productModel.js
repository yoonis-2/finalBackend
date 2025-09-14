const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    prImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "out of stock"], 
        default: "Available"
    },
    category: {
        type: String,
        required: true
    },
    // Add these new fields for ratings
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.Mixed, // Changed to Mixed to accept both ObjectId and String
            ref: 'User'
        },
        userName: { // Add a separate field for the user's name
            type: String,
            default: "Anonymous"
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    }
},
{timestamps: true}
)

productScheme.plugin(AutoIncrement, { inc_field: 'prId' });

productScheme.pre("save", function(next){
    this.status = this.quantity > 0 ? "Available"  : "out of stock"
    next()
})

productScheme.pre("updateOne", function(next) {
    const update = this.getUpdate()
    const quantity = update.$set?.quantity
    if(quantity !== undefined){
        update.$set.status = quantity > 0 ? "Available" : "out of stock"
    }
    next()
})

// Calculate average rating when a new rating is added
productScheme.methods.calculateAverageRating = function() {
    if (this.ratings.length === 0) {
        this.averageRating = 0;
        this.totalRatings = 0;
        return;
    }
    
    const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
    this.averageRating = parseFloat((sum / this.ratings.length).toFixed(1));
    this.totalRatings = this.ratings.length;
};

module.exports = mongoose.model("product", productScheme)