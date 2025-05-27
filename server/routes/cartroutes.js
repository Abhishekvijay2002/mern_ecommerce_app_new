
const { getcart, removefromcart, addToCart, increasequantity, decreasequantity, } = require('../controller/cartcontroller');
const { authUser } = require('../middleware/authmiddleware');
const cartRouter = require('express').Router()

cartRouter.post("/addtocart/:productid", authUser, addToCart)
cartRouter.get("/getcart", authUser, getcart)
cartRouter.delete("/removecart/:productid", authUser, removefromcart)
cartRouter.patch("/increasequantity/:productid", authUser , increasequantity)
cartRouter.patch("/decreasequantity/:productid", authUser , decreasequantity)

module.exports = cartRouter;