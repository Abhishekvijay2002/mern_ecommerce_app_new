const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controller/categoryController')
const { authAdmin } = require('../middleware/authmiddleware')
const upload = require('../middleware/multer')


const categoryRouter = require('express').Router()

categoryRouter.post("/create", authAdmin,upload.single("image"),createCategory )
categoryRouter.get("/getcategories", getAllCategories )
categoryRouter.get("/getcategories/:categoryid", getCategoryById )
categoryRouter.put("/update/:categoryid", authAdmin, upload.single("image"), updateCategory)
categoryRouter.delete("/delete/:categoryid", authAdmin , deleteCategory)

module.exports = categoryRouter