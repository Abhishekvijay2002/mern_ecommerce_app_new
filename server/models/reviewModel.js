const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', required: true
    },
    rating: {
        type: Number, required: true
    },
    review: {
        type: String, required: true
    },
    replies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users', required: true
            },
            review: {
                type: String, required: true
            },
            createdAt: {
                type: Date, default: Date.now
            }
        }

    ]

}, { timestamps: true })

module.exports = new mongoose.model('review', reviewSchema);