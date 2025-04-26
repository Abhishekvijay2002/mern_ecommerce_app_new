const { register, login, Logout, getuser, updateuser, deleteUser, GetallUsers } = require('../controller/userController')
const { authAdminOrUser, authAdmin, authUser } = require('../middleware/authmiddleware')

// const { verifyToken } = require('../../Utilities/verifyToken')

const userRouter = require('express').Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
// userRouter.post("/logout",Logout)
userRouter.get("/getuser",authUser,getuser)
userRouter.put("/update",authUser,updateuser)
userRouter.delete("/delete/:id",authAdminOrUser,deleteUser)
userRouter.get("/allusers",authAdmin,GetallUsers)

module.exports = userRouter;