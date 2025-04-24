import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart, deleteReview, Getproductbyid, getReviewsByProduct } from "../services/UserService";
import { toast } from 'sonner';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productid } = useParams();

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(""); // To store the selected image

  useEffect(() => {
    Getproductbyid(productid)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.image[0]); // Default to the first image
      })
      .catch((err) => console.log(err));

    getReviewsByProduct(productid)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((err) => console.log(err));
  }, [productid]);

  const addToCartHandler = async () => {
    try {
      await addToCart(product._id);
      toast.success("Added to cart successfully!");
    } catch {
      toast.error("Failed to add to cart!");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    deleteReview(reviewId)
      .then((res) => {
        toast.success("Review deleted successfully!");
        setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
      })
      .catch((error) => {
        toast.error("Failed to delete review!");
        console.log(error);
      });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Update selected image
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Product Image */}
        <div>
          <img
            src={selectedImage} // Show the selected image
            alt="Selected"
            className="w-80 h-80 object-cover rounded"
          />
          
          {/* Thumbnail Images Section Below Main Image */}
          <div className="flex space-x-4 mt-4">
            {product.image?.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer ${
                  selectedImage === imgUrl ? "border-4 border-blue-500" : ""
                }`}
                onClick={() => handleImageClick(imgUrl)} // Change selected image on click
              />
            ))}
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p> {/* Added Category */}
            <div className="flex items-center space-x-2 mt-2">

              <span className="text-lg font-semibold">{product.price}</span>
              {product.offerPrice && (
                <span className="text-sm text-gray-500 line-through">{product.offerPrice}</span> // If there's an offer price, show it
              )}
            </div>
            
            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex space-x-2">
            <button onClick={addToCartHandler} className="px-4 py-2 bg-black text-white rounded">
              Add to Cart
            </button>
            <button className="px-4 py-2 bg-black text-white rounded">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Tabs - Description & Reviews */}
      <div className="mt-10 border-b flex items-center space-x-6 text-lg">
        <button
          onClick={() => setActiveTab("description")}
          className={`${activeTab === "description" ? "font-bold" : "text-gray-600"}`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`${activeTab === "reviews" ? "font-bold" : "text-gray-600"}`}
        >
          Reviews
        </button>
        <button
          onClick={() => navigate(`/addreview/${product._id}`)}
          className="ml-auto px-1 py-1 mb-1 bg-cyan-400 text-white rounded hover:bg-blue-600"
        >
          Add Review
        </button>
      </div>

      {/* Description Section */}
      {activeTab === "description" && (
        <div className="mt-4">
          <p className="text-gray-700">{product.description}</p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Lorem ipsum dolor sit amet</li>
            <li>Consectetur adipisicing elit</li>
            <li>Sed do eiusmod tempor incididunt</li>
            <li>Ut labore et dolore magna aliqua</li>
          </ul>
        </div>
      )}

      {/* Reviews Section with Replies */}
      {activeTab === "reviews" && (
        <div className="mt-4 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex justify-between">
                  <h4 className="font-semibold">{review.user?.name || "Anonymous"}</h4>
                  <span className="text-yellow-500">{review.rating} ⭐</span>
                </div>
                <p className="mt-2 text-gray-700">{review.review}</p>

                {/* Replies Section */}
                {review.replies && review.replies.length > 0 && (
                  <div className="mt-4 border-l-4 pl-4">
                    <h5 className="font-bold text-gray-600">Replies:</h5>
                    {review.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="border p-2 rounded mt-2 bg-gray-100">
                        <h6 className="font-semibold">{reply.user?.name || "Anonymous"}</h6>
                        <p className="text-gray-700">{reply.review}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Delete Review Button */}
                <button
                  className="text-red-500 hover:text-blue-700 mt-2"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete review
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
