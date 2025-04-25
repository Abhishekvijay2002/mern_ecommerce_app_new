
const { getcart, removefromcart, addToCart } = require('../controller/cartcontroller');
const { authUser } = require('../middleware/authmiddleware');
const cartRouter = require('express').Router()

cartRouter.post("/addtocart/:productid", authUser, addToCart)
cartRouter.get("/getcart", authUser, getcart)
cartRouter.delete("/removecart/:productid", authUser, removefromcart)

module.exports = cartRouter;