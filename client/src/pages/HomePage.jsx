import React, { useEffect, useState , useRef} from "react";
import CardSlider from "../components/Cardslider";
import { GetAllCategory, ListBestsellingProducts, listProductswithOffers } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function HomePage() {
  const [bestsellingProducts, setBestsellingProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();
  const categoryRef = useRef(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [bestsellersRes, offersRes, categoriesRes] = await Promise.all([
          ListBestsellingProducts(),
          listProductswithOffers(),
          GetAllCategory(),
        ]);

        setBestsellingProducts(bestsellersRes.data.slice(0, 20));
        setOfferProducts(offersRes.data.slice(0, 20));
        setCategory(categoriesRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHomepageData();
  }, []);
  const scrollLeft = () => {
    categoryRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    categoryRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">Endless Choices, Limitless Savings!</h1>
        <p className="text-lg mb-8 leading-relaxed">
          Discover a seamless shopping experience with Quick Buy.<br />
          From the latest gadgets to fashion, home essentials, and more, 
          we bring top-quality products at unbeatable prices, delivered right to your doorstep.
        </p>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-8 bg-[var(--secondary-bg-color)] relative">
      <h1 className="text-3xl font-bold mb-8 text-center">Categories</h1>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full opacity-0 hover:opacity-100 transition"
        onClick={scrollLeft}
      >
        <FiChevronLeft className="text-[var(--primary-text-color)] text-3xl" />
      </button>
      <div
        className="flex gap-6 overflow-hidden mx-auto justify-center"
        ref={categoryRef}
      >
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center gap-2 cursor-pointer">
            <div className="rounded-full h-20 w-20 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                onClick={() => navigate(`/product/category/${category._id}`)}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </div>
        ))}
      </div>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full opacity-0 hover:opacity-100 transition"
        onClick={scrollRight}
      >
        <FiChevronRight className="text-[var(--primary-text-color)] text-3xl" />
      </button>
    </section>

      {/* Bestsellers Section */}
      <section className="py-16 px-8 bg-[var(--best-seller-bg)] text-[var(--best-seller-text)] transition-all">
        <h1 className="text-4xl font-bold text-center">🔥 Best Sellers & Featured Products</h1>
        <p className="text-lg text-center text-placeholder-text-color mt-4">
          Top-rated products loved by our customers!
        </p>
        <div className="mt-10 justify-center">
          {bestsellingProducts.length > 0 && <CardSlider products={bestsellingProducts} />}
        </div>
        <p className="text-center mt-6">
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/product/bestsellers")}
          >
            View More ➜
          </span>
        </p>
      </section>

      {/* Offers Section */}
      <section className="py-16 px-8 bg-[var(--secondary-bg-color)] transition-all">
        <h1 className="text-4xl font-bold text-center">⚡ Limited-Time Deals & Offers</h1>
        <p className="text-lg text-center text-placeholder-text-color mt-4">
          Grab these deals before they're gone!
        </p>
        <div className="mt-10 justify-center">
          {offerProducts.length > 0 && <CardSlider products={offerProducts} />}
        </div>
        <p className="text-center mt-6">
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/product/offers")}
          >
            View More ➜
          </span>
        </p>
      </section>
    </div>
  );
}

export default HomePage;
