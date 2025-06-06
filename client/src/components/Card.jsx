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
    imageSrc = 'https://via.placeholder.com/240x160?text=No+Image'; // Reduced placeholder size
  }

  const handleClick = () => {
    navigate(`/productdetails/${product._id}`);
  };

  const Product = product;

  const addCourseToCart = async (productId, event) => {
    event.stopPropagation(); 
    try {
      const response = await addToCart(productId);
      console.log(response.data);
      toast.success("Added to cart successfully!");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="max-w-xs rounded overflow-hidden shadow-md bg-[var(--card-bg)] hover:shadow-lg transition-shadow cursor-pointer text-[var(--text-color)]"
    >
      {/* Product Image - consistent rectangular size */}
      <img
        className="w-full h-48 md:h-64 object-contain bg-white p-2"
        src={imageSrc}
        alt={Product.title}
      />

      {/* Content */}
      <div className="p-1.5 md:p-3 text-center">
        {/* Product Title */}
        <h2 className="text-xs md:text-md font-semibold">
          {Product.title.slice(0, 14)}
        </h2>

        {/* Price Display */}
        <p className="text-xs md:text-sm mt-1.5">
          {Product.offerPrice ? (
            <>
              <span className="text-red-500 font-bold text-lg pr-1">
                ₹{Product.offerPrice}
              </span>
              <span className="line-through text-sm">₹{Product.price}</span>
            </>
          ) : (
            `₹${Product.price}`
          )}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={(event) => addCourseToCart(Product._id, event)}
          className="mt-3 px-2 md:px-3 py-0.5 md:py-1.5 bg-[var(--button-bg)] text-[var(--button-text)] font-medium rounded-md hover:brightness-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;

