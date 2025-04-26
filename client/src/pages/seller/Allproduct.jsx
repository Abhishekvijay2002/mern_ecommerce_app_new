import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { DeleteProduct, ListProductforSeller } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ListProductforSeller();
        setProducts(res.data);
        toast.success("Products Fetched");
      } catch (err) {
        console.error(err);
        toast.error("Error Fetching Products");
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteProduct(id);
      toast.success("Product deleted successfully!");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Products</h2>

      {/* Scrollable Table Wrapper */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-y-auto max-h-[400px]">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                    <td className="py-3 px-6">{product.title}</td>
                    <td className="py-3 px-6">{product.category}</td>
                    <td className="py-3 px-6 text-yellow-600 font-medium">₹{product.price}</td>
                    <td className="py-3 px-6">
                      <img src={product.image} alt="Product" className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                          Delete
                        </button>
                        <button onClick={() => navigate(`/seller/updateproduct/${product._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                          Edit
                        </button>
                      </div>
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
}

export default AllProducts;
