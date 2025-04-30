import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ListProductforSeller, GetCategoryByid } from "../services/UserService";

const Sellerdasboard = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({}); // Fix: Added missing state

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsRes = await ListProductforSeller();
        setProducts(productsRes.data);
        console.log("product" , productsRes)

        const categoryPromises = productsRes.data.map((product) => GetCategoryByid(product.category));
        const categoriesRes = await Promise.all(categoryPromises);
        
        const categoryMap = {};
        categoriesRes.forEach((res, index) => {
          categoryMap[productsRes.data[index].category] = res.data.name;
        });
        setCategories(categoryMap);

        toast.success("Products and categories fetched!");
      } catch (err) {
        const errorMsg = err.response?.data?.error || "Something went wrong"; // Fix: Use `err` instead of `error`
        toast.error(errorMsg);
        console.error(errorMsg);
      }
    };

    fetchProductsAndCategories();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="p-4 shadow rounded text-center bg-[var(--card-bg)] border border-[var(--table-border)]">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="p-4 shadow rounded text-center bg-[var(--card-bg)] border border-[var(--table-border)]">
          <h2 className="text-lg font-semibold">Recently Added</h2>
          <ul className="text-sm">
            {products.slice(0, 5).map((product) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scrollable Product Table */}
      <div className="p-6 min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>

        {/* Scrollable Table */}
        <div className="shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)] bg-[var(--table-bg)]">
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full text-left border-separate border-spacing-y-4" style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
              <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
                <tr>
                  <th className="py-3 px-6">Product Name</th>
                  <th className="py-3 px-6">Category</th>
                  <th className="py-3 px-6">Stock</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Image</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                      <td className="py-3 px-6">{product.title}</td>
                      <td className="py-3 px-6">{categories[product.category]}</td>
                      <td className="py-3 px-6 text-yellow-600 font-medium">₹{product.stock}</td>
                      <td className="py-3 px-6 text-yellow-600 font-medium">₹{product.price}</td>
                      <td className="py-3 px-6">
                        <img src={product.image[0]} alt="Product" className="w-16 h-16 object-cover rounded-lg" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-3 px-6 text-center text-[var(--table-text-color)]">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellerdasboard;

