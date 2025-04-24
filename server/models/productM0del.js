const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
        default: null 
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    salesCount: {
        type: Number,
        default: 0 
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    roleOfAdder: {
        type: String,
        enum: ['admin', 'seller'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);
