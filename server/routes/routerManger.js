const adminRouter = require("./adminroutes")
const cartRouter = require("./cartroutes")
const categoryRouter = require("./categoryroutes")
const orderrouter = require("./orderroutes")
const paymentRouter = require("./paymentRoutes")
const productRouter = require("./productroutes")
const reviewRouter = require("./reviewroutes")
const sellerrouter = require("./sellerroutes")
const userRouter = require("./userRoutes")

const manageRouter = require("express").Router()

manageRouter.use("/user",userRouter)
manageRouter.use("/admin",adminRouter)
manageRouter.use("/product",productRouter)
manageRouter.use("/cart",cartRouter)
manageRouter.use("/order",orderrouter)
manageRouter.use("/review",reviewRouter)
manageRouter.use("/seller",sellerrouter)
manageRouter.use("/payment",paymentRouter)
manageRouter.use("/category",categoryRouter)


module.exports = manageRouter