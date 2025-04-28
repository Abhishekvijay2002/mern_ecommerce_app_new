import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const CardSlider = ({ products }) => {
  if (!products || products.length === 0) return null; // Don't render if no products

  return (
    <div className="p-8">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        speed={800}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {products.slice(0, 20).map((product) => (
          <SwiperSlide key={product._id}>
            <div
              className="max-w-sm rounded overflow-hidden  shadow-lg bg-[var(--card-bg)] hover:shadow-xl transition-shadow cursor-pointer text-[var(--text-color)]"
            >
              <img className="w-full h-60 md:h-80 object-cover" src={product.image[0]} alt={product.title} />

              <div className="p-2 md:p-4 text-center">
                <h2 className="text-sm md:text-lg font-semibold">{product.title.slice(0, 17)}</h2>

                <p className="text-xs md:text-sm mt-2">
                  {product.offerPrice ? (
                    <>
                      <span className="text-red-500 font-bold text-xl pr-1">₹{product.offerPrice}</span>
                      <span className="line-through">₹{product.price}</span>
                    </>
                  ) : (
                    `₹${product.price}`
                  )}
                </p>

                <button className="mt-4 px-3 md:px-4 py-1 md:py-2 bg-[var(--button-bg)] text-[var(--button-text)] font-medium rounded-lg hover:brightness-90 transition">
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

