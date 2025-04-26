
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListProductforSeller } from "../services/UserService";

const SellerDashboard = ({ sellerId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ListProductforSeller(); // Pass sellerId to API call
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching seller products", error);
      }
    };
    fetchProducts();
  }, [sellerId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Stats Grid for Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-semibold">Recently Added</h2>
          <ul className="text-sm">
            {products.slice(0, 5).map((product) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product List */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Product List</h2>
        <div className="bg-white p-4 shadow rounded">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="flex flex-col sm:flex-row justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  {product.image?.[0] && (
                    <img
                      src={product.image[0]}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-gray-500">{product.price ? `₹${product.price}` : "No Price Available"}</p>
                    <p className="text-gray-500">{product.offerPrice ? `Offer Price: ₹${product.offerPrice}` : "No Offer Available"}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 mt-2 sm:mt-0">Stock: {product.stock}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;



