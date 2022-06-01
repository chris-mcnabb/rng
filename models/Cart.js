const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },

        items: {
            type: [
                {productId: {type: String, required: true},
                quantity: {type: Number, required: true},
                color: {type: String},
                size: {type: String},
                name: {type: String},
                price: {type: Number},
                img: {type: String},
                modelId: {type: String},
                }
            ]
        },
        status: {
            type: Number,
            default: 0,

        },

    },
    {timestamps: true }
);
module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
