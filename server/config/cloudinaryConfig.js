const cloudinary = require("cloudinary").v2
const dotenv = require('dotenv').config()

cloudinary.config({
    api_secret: process.env.api_secret,
    api_key: process.env.api_key,
    cloud_name: process.env.cloud_name,
    
})

module.exports = cloudinary