const uploadToCloudinary = require("../Utilities/imageUpload");
const categoryModel = require("../models/categoryModel");
const fs = require("fs");


const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "An image is required for the category" });
    }

    const uploadedImage = await uploadToCloudinary(req.file.path);

    const newCategory = new categoryModel({
      name,
      image: uploadedImage, 
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({ message: "Category created successfully", savedCategory });

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};
const getAllCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.status(200).json({message: "Category created successfully",categories });
    } catch (error) {
      console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  
  // Get Single Category
  const getCategoryById = async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.categoryid);
      if (!category) return res.status(404).json({ message: "Category not found" });
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  
  // Update Category
  const updateCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const category = await categoryModel.findById(req.params.categoryid);
      if (!category) return res.status(404).json({ error: "Category not found" });
  
      let imageUrl = category.image;
  
      if (req.file) {
        imageUrl = await uploadToCloudinary(req.file.path, "categories");
        fs.unlinkSync(req.file.path);
      }
  
      category.name = name || category.name;
      category.image = imageUrl;
  
      const updatedCategory = await category.save();
      res.status(200).json({ message: "Category updated", category: updatedCategory });
    } catch (error) {
      console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
  
  // Delete Category
  const deleteCategory = async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.categoryid);
      if (!category) return res.status(404).json({ error: "Category not found" });
  
     await category.deleteOne();
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
  };
module.exports ={createCategory , getAllCategories , getCategoryById , updateCategory , deleteCategory} 
