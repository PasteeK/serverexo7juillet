const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ["Informatique", "Electronique", "Mode", "Autre"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Product', productSchema)