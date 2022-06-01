const mongoose = require('mongoose');

const WebImageSchema = new mongoose.Schema({
        webPic: {
            type: String,
        },
        vendorLogo: {
            type: String,
        },
    construction: {
            type: String
    },
        video: {
            type: String,
        },
        link: {
            type: String,
        }

    },
    {timestamps: true }
);
module.exports = mongoose.models.WebImage || mongoose.model('WebImage', WebImageSchema);
