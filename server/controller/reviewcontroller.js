const orderModel = require("../models/orderModel");
const productM0del = require("../models/productM0del");
const reviewModel = require("../models/reviewModel");
const Review = require("../models/reviewModel");
const mongoose = require('mongoose');



const createReview = async (req, res) => {
    try {
        const userid = req.userId.id;
        const { productId } = req.params;
        const { rating, newreview } = req.body;


        const order = await orderModel.findOne({
            userId: userid,
            "product.productid": productId,
            orderstatus: "delivered",
        });

        if (!order) {
            return res.status(403).json({ 
                error: "You can only review delivered products." ,
                success: false, 
                
            });
            
        }

        const existingReview = await Review.findOne({ product: productId, user: userid });
        if (existingReview) {
            return res.status(409).json({ success: false, error: "You can only review a product once." });
        }

        const review = new Review({ product: productId, user: userid, rating, review: newreview });
        await review.save();

        res.status(201).json({ success: true, message: "Review added successfully", review });

    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};


const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId }).populate("user", "name").populate("replies.user", "name");
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
    }
};
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find().populate("user", "name").populate("product", "name");

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error("Error while deleting product:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

const getReviewsBySeller = async (req, res) => {
    console.log("Inside getReviewsBySeller"); 
    try {
        const sellerId = new mongoose.Types.ObjectId(req.userId.id);
        console.log("Seller ID:", sellerId); 
        
        // Fetch all products added by this seller
        const sellerProducts = await productM0del.find({ addedBy: sellerId }).select("_id");
        console.log("Fetched Seller Products:", sellerProducts); 


        if (sellerProducts.length === 0) {
            return res.status(404).json({ success: false, error: "No products found for this seller." });
        }


        const productIds = sellerProducts.map(product => product._id);
        console.log("Product IDs:", productIds); 


        const reviews = await reviewModel.find({ product: { $in: productIds } })
            .populate("user", "name")
            .populate("product", "title");
        console.log("Reviews:", reviews); 


        res.status(200).json({ success: true, reviews });

    } catch (error) {
        console.error("Error while deleting product:", error);
        return res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

const addReply = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const user = req.userId.id;
        const { Comment } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, error: "Review not found" });
        }

        review.replies.push({ user, review: Comment });
        await review.save();

        res.status(200).json({ success: true, message: "Reply added successfully", review });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error :error.message || "Intenal Server Error"})
    }
};

module.exports = {
   deleteReview , createReview ,addReply,getReviewsByProduct , getAllReviews ,getReviewsBySeller
}