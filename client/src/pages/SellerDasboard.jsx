import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ListProductforSeller } from "../services/UserService";

const ProductList = ({ sellerId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ListProductforSeller();
        setProducts(response.data || []);
        toast.success("Products Fetched");
      } catch (error) {
        console.error("Error fetching seller products", error);
        toast.error("Error Fetching Products");
      }
    };
    fetchProducts();
  }, [sellerId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-hidden">
      {/* Stats Section */}
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

      {/* Scrollable Product Table */}
      <div className="mt-6 bg-white p-4 shadow rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[400px]">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                    <td className="py-3 px-6">{product.title}</td>
                    <td className="py-3 px-6">{product.category}</td>
                    <td className="py-3 px-6 text-yellow-600 font-medium">₹{product.price}</td>
                    <td className="py-3 px-6">{product.stock}</td>
                    <td className="py-3 px-6">
                      {product.image?.[0] && (
                        <img src={product.image[0]} alt={product.title} className="w-16 h-16 object-cover rounded-lg" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center text-gray-500">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;


