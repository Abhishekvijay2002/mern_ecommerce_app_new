import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, deleteReview, Getproductbyid, getReviewsByProduct } from "../services/UserService";
import { toast } from "sonner";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productid } = useParams();
  
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    Getproductbyid(productid)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.image[0]); 
      })
      .catch((err) => console.log(err));

    getReviewsByProduct(productid)
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.log(err));
  }, [productid]);

  const addToCartHandler = async () => {
    try {
      await addToCart(product._id);
      toast.success("Added to cart successfully!");
    } catch {
      const errorMsg = error.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      console.error(errorMsg);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    deleteReview(reviewId)
      .then(() => {
        toast.success("Review deleted successfully!");
        setReviews(prev => prev.filter(review => review._id !== reviewId));
      })
      .catch((error) =>{
        const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
      });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[var(--bg-color)] text-[var(--text-color)] transition">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image Section */}
        <div>
          <img src={selectedImage} alt="Selected" className="w-[70%] h-[70%] object-cover rounded-lg shadow-lg" />
          <div className="flex space-x-4 mt-4 overflow-x-auto">
            {product.image?.map((imgUrl, index) => (
              <img 
                key={index} 
                src={imgUrl} 
                alt={`Thumbnail ${index + 1}`} 
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${selectedImage === imgUrl ? "border-4 border-blue-500" : ""}`} 
                onClick={() => setSelectedImage(imgUrl)} 
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--heading-color)]">{product.title}</h2>
            <p className="text-sm text-[var(--text-color)] mt-1">{product.category}</p>
            <p className="text-xl text-[var(--text-color)] mt-2">
              {product.offerPrice ? (
                <>
                  <span className="text-red-500 font-bold text-2xl pr-1">₹{product.offerPrice}</span>
                  <span className="text-gray-500 line-through">₹{product.price}</span>
                </>
              ) : (
                `₹${product.price}`
              )}
            </p>

            {/* Add to Cart Button */}
            <button 
              onClick={addToCartHandler} 
              className="px-6 py-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded-lg shadow-md hover:opacity-80 transition-all duration-300 mt-4"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Description & Reviews */}
      <div className="mt-10 border-b flex items-center space-x-6 text-lg text-[var(--text-color)]">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 ${activeTab === "description" ? "font-bold text-blue-500 border-b-2 border-blue-500" : "text-[var(--text-color)]"}`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 ${activeTab === "reviews" ? "font-bold text-blue-500 border-b-2 border-blue-500" : "text-[var(--text-color)]"}`}
        >
          Reviews
        </button>
        <button
          onClick={() => navigate(`/addreview/${product._id}`)}
          className="ml-auto px-4 py-2 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500 mb-2"
        >
          Add Review
        </button>
      </div>

      {/* Description Tab */}
      {activeTab === "description" && (
        <div className="mt-6 space-y-4">
          <p className="text-[var(--text-color)]">{product.description}</p>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="mt-6 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md bg-[var(--card-bg)] border-[var(--border-color)]">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-[var(--heading-color)]">{review.user?.name || "Anonymous"}</h4>
                  <span className="text-yellow-500">{review.rating} ⭐</span>
                </div>
                <p className="mt-2 text-[var(--text-color)]">{review.review}</p>
                <button
                  className="text-red-500 hover:text-blue-700 mt-2"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete Review
                </button>
              </div>
            ))
          ) : (
            <p className="text-[var(--text-color)]">No reviews yet. Be the first to review!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;


