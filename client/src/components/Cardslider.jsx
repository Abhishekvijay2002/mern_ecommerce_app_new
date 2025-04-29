import React from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/UserService";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const CardSlider = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  const addCourseToCart = async (productId, event) => {
    event.stopPropagation();
    try {
      await addToCart(productId);
      toast.success("Added to cart successfully!");
    } catch (error) {
      toast.error( error.error || "Failed to add to cart!");
    }
  };

  return (
    <div className="px-4 md:px-8">
      <Swiper
        spaceBetween={20}
        loop={true}
        speed={800}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          728: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {products.slice(0, 20).map((product) => (
          <SwiperSlide key={product._id}>
            <div
              onClick={() => navigate(`/productdetails/${product._id}`)}
              className="w-72 rounded-lg overflow-hidden shadow-lg bg-[var(--card-bg)] hover:shadow-xl transition-shadow cursor-pointer text-[var(--text-color)] flex flex-col"
            >
              {/* Image covers full top */}
              <img
                className="w-full h-40 object-cover"
                src={product.image[0]}
                alt={product.title}
              />

              {/* Card body */}
              <div className="p-4">
                <h5 className="text-lg font-semibold">{product.title.slice(0,30)}</h5>
                <p className="text-sm text-placeholder-text-color mt-2">
                  {product.offerPrice ? (
                    <>
                      <span className="text-red-500 font-bold text-lg pr-1">
                        ₹{product.offerPrice}
                      </span>
                      <span className="line-through ">₹{product.price}</span>
                    </>
                  ) : (
                    <span className="font-bold text-lg pr-1">₹{product.price}</span>
                  )}
                </p>
                <button
                  onClick={(event) => addCourseToCart(product._id, event)}
                  className="mt-4 px-4 py-2 bg-[var(--button-bg)] text-[var(--button-text)] font-medium rounded-lg hover:brightness-90 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSlider;
