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

  const Product = product;

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
      className="max-w-sm rounded overflow-hidden shadow-lg bg-[var(--card-bg)]  hover:shadow-xl transition-shadow cursor-pointer sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl text-[var(--text-color)]"
    >
      {/* Product Image */}
      <img
        className="w-full h-60 md:h-80 object-cover"
        src={imageSrc}
        alt={Product.title}
      />

      {/* Content */}
      <div className="p-2 md:p-4 text-center">
        {/* Product Name */}
        <h2 className="text-sm md:text-lg font-semibold">{Product.title.slice(0,17)}</h2>

        <p className="text-xs md:text-sm mt-2">
          {Product.offerPrice ? (
            <>
              <span className="text-red-500 font-bold text-xl pr-1">₹{Product.offerPrice}</span>
              <span className="line-through">₹{Product.price}</span>
            </>
          ) : (
            `₹${Product.price}`
          )}
        </p>

        <button
          onClick={(event) => addCourseToCart(Product._id, event)}
          className="mt-4 px-3 md:px-4 py-1 md:py-2 bg-[var(--button-bg)] text-[var(--button-text)] font-medium rounded-lg hover:brightness-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;

