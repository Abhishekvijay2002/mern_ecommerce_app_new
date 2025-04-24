const { register, login, Logout, getuser, updateuser, deleteUser, GetallUsers } = require('../controller/userController')
const authAdmin = require('../middleware/authadmin')
const authAdminOruser = require('../middleware/authAdminOruser')
const authuser = require('../middleware/authuser')
// const { verifyToken } = require('../../Utilities/verifyToken')

const userRouter = require('express').Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",Logout)
userRouter.get("/getuser",authuser,getuser)
userRouter.put("/update",authuser,updateuser)
userRouter.delete("/delete/:id",authAdminOruser,deleteUser)
userRouter.get("/allusers",authAdmin,GetallUsers)

module.exports = userRouter;