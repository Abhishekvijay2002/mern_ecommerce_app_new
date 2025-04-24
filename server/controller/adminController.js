
const userModel = require("../models/userModel")
const { createToken } = require("../Utilities/generateToken")
const {hashPassword, comparePassword} = require("../Utilities/passwordUtilities")


const adminregister = async(req,res)=>{
   try {
     const {name,email,password} =req.body
     if( !name||!email || !password){
        return res.status(400).json({error:"all fields are Required"})
     }

const Userexist =await userModel.findOne({email : email})

if(Userexist){
    return res.status(400).json({error:"User already exist with this email"})
}
const hashedPassword = await hashPassword(password)

const newAdmin = new userModel({
name,email,password:hashedPassword ,role : "admin"
   
})
 const saved = await newAdmin.save()
 if(saved){
   return res.status(201).json({message:"User created successfully"})
 }
   } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error :error.message || "Internal Server Error"})
   }
}
 
 


module.exports = {
    adminregister
}