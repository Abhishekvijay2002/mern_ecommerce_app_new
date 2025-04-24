const mongoose =require("mongoose")




const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user","seller"],default:"user"
    },
    sellerApprovalStatus: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'],default: null 
    },

},{timestamps:true})

module.exports = new mongoose.model('users',userSchema)