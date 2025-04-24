
const { createproduct, listProducts, productDetails, updateProduct, deleteProduct, listProductsforSeller, searchProducts, bestselling, setOfferprice, offerproduct, removeOfferprice, getProductsByCategory } = require('../controller/productcontroller')

const upload = require("../middleware/multer")
const authAdminOrSeller = require('../middleware/authAdminOrSeller')

const productRouter = require('express').Router()


productRouter.post("/create", authAdminOrSeller, upload.array("images", 5), createproduct);
productRouter.get("/getproducts",listProducts)
productRouter.get("/getproductsforseller",authAdminOrSeller,listProductsforSeller)
productRouter.get("/getdetail/:productid",productDetails)
productRouter.get("/search",searchProducts)
productRouter.get("/bestselling", bestselling)
productRouter.get("/offerproduct", offerproduct)
productRouter.get("/:categoryid",getProductsByCategory)
productRouter.put("/setoffer/:productid",authAdminOrSeller ,setOfferprice)
productRouter.delete("/deleteoffer/:productid",authAdminOrSeller ,removeOfferprice)
productRouter.put("/update/:productid",authAdminOrSeller,upload.array("images" ,5),updateProduct)
productRouter.delete("/delete/:productid",authAdminOrSeller,deleteProduct)

module.exports =productRouter