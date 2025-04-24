const mongoose = require('mongoose');

const cartschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        index: true,
    },
    product: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            }
        },
    ],
    totalprice: {
        type: Number,
        required: true,
        default: 0,
    },
});

cartschema.methods.calculateTotalprice = function () {
    this.totalprice = this.product.reduce((total,product) => total + (Number(product.price) || 0), 0);
};

module.exports = mongoose.model('carts', cartschema);