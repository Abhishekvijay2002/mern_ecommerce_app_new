const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controller/categoryController')
const upload = require('../middleware/multer')
const authadmin = require('../middleware/authadmin')

const categoryRouter = require('express').Router()

categoryRouter.post("/create", authadmin,upload.single("image"),createCategory )
categoryRouter.get("/getcategories", getAllCategories )
categoryRouter.get("/getcategories/:categoryid" ,authadmin , getCategoryById )
categoryRouter.put("/update/:categoryid", authadmin, upload.single("image"), updateCategory)
categoryRouter.delete("/delete/:categoryid", authadmin, deleteCategory)

module.exports = categoryRouter