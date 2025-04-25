import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { GetAllCategory, ListBestsellingProducts, listProductswithOffers } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const [bestsellingProducts, setBestsellingProducts] = useState([]);
    const [offerProducts, setOfferProducts] = useState([]);
    const [categories, setCategory] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const bestRes = await ListBestsellingProducts();
          setBestsellingProducts(bestRes.data);
  
          const offerRes = await listProductswithOffers();
          setOfferProducts(offerRes.data);

          const categoryRes = await GetAllCategory();
          setCategory(categoryRes.data);

        } catch (err) {
          console.error("Error fetching products", err);
        }
      };
  
      fetchProducts();
    }, []);
  return (
    <div>
    <section className=" py-16 px-8 text-center">
      <h1 className="text-5xl font-bold mb-6 ">
        Endless Choices, Limitless Savings!
      </h1>
      <p className="text-lg mb-8 leading-relaxed text-center">
        Discover a seamless shopping experience with Quick Buy<br/> From the latest gadgets to fashion, home essentials, and more, 
        we bring top-quality products at unbeatable prices, delivered right to your doorstep.
      </p>
    </section>
 <section className="py-16 px-8 ">
      <h1 className="text-3xl font-bold mb-8 text-center">Categories</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className=" rounded-full h-20 w-20 overflow-hidden">
              <img
                src={category.image}
                alt={category.name} onClick={() => navigate(`/product/category/${category._id}`)}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
    <section>
        <h1 className="text-3xl font-bold mb-8 text-center mt-4">Featured Products / Best sellers</h1>
        <p className='text-right m-4'onClick={() => navigate('/product/bestsellers')}>View More....</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4'>
          {bestsellingProducts.map(product => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-bold mb-8 text-center mt-4">Limited Time Deals / Offers</h1>
        <p className='text-right m-4' onClick={() => navigate('/product/offers')}>View More....</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
          {offerProducts.map(product => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
