import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/UserService";
import { toast } from "sonner";

function Card({ product }) {
  const navigate = useNavigate();

  let imageSrc = '';

  if (Array.isArray(product.image)) {
    imageSrc = product.image[0]; 
  } else if (typeof product.image === 'string') {
    imageSrc = product.image; 
  } else {
    imageSrc = 'https://via.placeholder.com/300x200?text=No+Image';
  }



  const handleClick = () => {
    navigate(`/productdetails/${product._id}`);
  };

  const Product = product 

  const addCourseToCart = async (productId, event) => {
    event.stopPropagation(); // Prevents navigation when clicking the button
    try {
      const response = await addToCart(productId);
      console.log(response.data);
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add to cart!");
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="max-w-80 rounded overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <img
        className="w-full h-80 object-cover"
        src={imageSrc}
        alt={Product.title}
      />

      {/* Content */}
      <div className="p-4 text-center">
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-800">{Product.title.slice(0,17)}</h2>

        {/* Price */}
        <p className="text-sm text-gray-500 mt-2">₹{Product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={(event) => addCourseToCart(Product._id, event)}
          className="mt-4 px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;

