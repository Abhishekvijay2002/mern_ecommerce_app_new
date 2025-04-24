
const categoryModel = require("../models/categoryModel");
const productM0del = require("../models/productM0del");
const productModel = require("../models/productM0del");
const uploadToCloudinary = require("../Utilities/imageUpload");

const createproduct = async (req, res) => {
  try {
    const { title, description, price, stock, category } = req.body;

    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const imageUploadPromises = req.files.map(file => uploadToCloudinary(file.path));
    const uploadedImages = await Promise.all(imageUploadPromises);

    const newProduct = new productModel({
      title,
      description,
      price,
      stock,
      category,
      image: uploadedImages,
      addedBy: req.userId.id,
      roleOfAdder: req.userId.role
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", savedProduct });

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};


const listProducts = async (req, res) => {
  try {
    const productList = await productModel.find();
    res.status(200).json(productList);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

const listProductsforSeller = async (req, res) => {
  try {
    const filter = req.userId?.role === 'seller' ? { addedBy: req.userId.id } : {};
    const products = await productModel.find(filter).populate('addedBy', 'name role');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const productDetails = async (req, res) => {
  try {
    const { productid } = req.params;
    console.log(req.params.productid);

    const productDetail = await productM0del.findById(productid);
    if (!productDetail) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productDetail);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    console.log("Search Query:", q);

    let query = {};

    if (q) {
      console.log("Constructing query for:", q);

      query.title = { $regex: q, $options: "i" };

      console.log("Final Query:", JSON.stringify(query, null, 2));
    }

    const products = await productModel.find(query).populate("category", "name");

    console.log("Products found:", products);

    res.json(products);
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const setOfferprice = async (req, res) => {
  try {
    const { offerPrice } = req.body;
    const { productid } = req.params;
    const userId = req.userId.id;
    const userRole = req.userId.role;

    if (typeof offerPrice !== 'number' || offerPrice <= 0) {
      return res.status(400).json({ message: 'Offer price must be a valid positive number' });
    }

    const product = await productModel.findById(productid);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (userRole === 'seller' && product.addedBy.toString() !== userId) {
      return res.status(403).json({ message: 'You can only modify your own products' });
    }
    if (offerPrice >= product.price) {
      return res.status(400).json({ message: 'Offer price must be less than the original price' });
    }    
    const updatedProduct = await productModel.findByIdAndUpdate(
      productid,
      { offerPrice },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Offer added successfully', product: updatedProduct });

  } catch (error) {
    console.error('Set Offer Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const  removeOfferprice = async (req, res) => {
  try {
    const { productid } = req.params;
    const { id: userId, role: userRole } = req.userId;

    const product = await productModel.findById(productid);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (userRole === 'seller' && product.addedBy.toString() !== userId) {
      return res.status(403).json({ message: 'You can only modify your own products' });
    }

    if (product.offerPrice === null) {
      return res.status(400).json({ message: 'No offer to remove' });
    }

    product.offerPrice = null;
    await product.save();

    res.status(200).json({ message: 'Offer removed successfully', product });

  } catch (error) {
    console.error('Remove Offer Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const offerproduct = async (req, res) => {
  try {
    const productsWithOffers = await productModel.find({
      offerPrice: { $ne: null },
    });

    res.json(productsWithOffers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Failed to fetch products with offers' });
  }
}

const bestselling = async (req, res) => {
  try {
    const products = await productModel.find()
      .sort({ salesCount: -1 })
      .limit(10);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bestsellers' });
  }
}


const getProductsByCategory = async (req, res) => {
  try {
    const { categoryid } = req.params;

 
    const category = await categoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await productModel
      .find({ category: categoryid })
      .populate("category", "name") 
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getProductsByCategory:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, offerPrice } = req.body;
    const product = await productModel.findById(req.params.productid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ensure 'addedBy' is defined before using toString()
    if (req.userId.role === 'seller') {
      if (!product.addedBy) {
        return res.status(400).json({ message: "'addedBy' field is missing in the product" });
      }

      // Check if the user trying to update the product is the seller who added it
      if (product.addedBy.toString() !== req.userId.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
    }

    // Handle image uploads if any
    let imageUrls = product.image;
    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(req.files.map(file => uploadToCloudinary(file.path)));
    }

    // Update the product with the new data
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.productid,
      { 
        title, 
        description, 
        price, 
        stock, 
        category, 
        offerPrice, 
        image: imageUrls 
      },
      { new: true }
    );

    res.status(200).json({ message: "Product updated successfully", updatedProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};



const deleteProduct = async (req, res) => {
  try {
    // Check if user info is attached
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized. No user data." });
    }

    // Log IDs for debugging
    console.log("Requested Product ID:", req.params.productid);
    console.log("User ID:", req.userId.id);
    console.log("User Role:", req.userId.role);

    // Fetch product
    const product = await productModel.findById(req.params.productid);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Log createdBy info
    console.log("Product createdBy:", product.createdBy?.toString());

    // Restrict delete for sellers who don’t own the product
    if (
      req.userId.role === 'seller' &&
      product.createdBy &&
      product.createdBy.toString() !== req.userId.id
    ) {
      return res.status(403).json({ message: "Unauthorized: Not your product" });
    }

    // Delete product
    await productModel.findByIdAndDelete(req.params.productid);

    // Success
    return res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    // Log and return error
    console.error("Error while deleting product:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = { createproduct, listProducts, productDetails, updateProduct, deleteProduct, listProductsforSeller, searchProducts, setOfferprice, offerproduct, bestselling  , removeOfferprice , getProductsByCategory};
