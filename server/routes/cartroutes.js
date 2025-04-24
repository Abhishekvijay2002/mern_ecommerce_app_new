
const { getcart, removefromcart, addToCart } = require('../controller/cartcontroller');
const authuser = require('../middleware/authuser');
const cartRouter = require('express').Router()

cartRouter.post("/addtocart/:productid", authuser, addToCart)
cartRouter.get("/getcart", authuser, getcart)
cartRouter.delete("/removecart/:productid", authuser, removefromcart)

module.exports = cartRouter;