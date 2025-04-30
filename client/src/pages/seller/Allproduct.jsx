import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { DeleteProduct, ListProductforSeller, addOffers, removeOffers,  GetCategoryByid } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsRes = await ListProductforSeller();
        setProducts(productsRes.data);

        const categoryPromises = productsRes.data.map(product => GetCategoryByid(product.category));
        const categoriesRes = await Promise.all(categoryPromises);
        console.log(categoriesRes)

        const categoryMap = {};
        categoriesRes.forEach((res, index) => {
          categoryMap[productsRes.data[index].category] = res.data.name;
        });
        setCategories(categoryMap);

        toast.success("Products and categories fetched!");
      } catch (err) {
        const errorMsg = error.response?.data?.error || "Something went wrong";
        toast.error(errorMsg);
        console.error(errorMsg);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteProduct(id);
      toast.success("Product deleted successfully!");
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
    }
  };

  const handleAddOffer = () => {
    if (!offerPrice) {
      toast.error("Please enter an offer price!");
      return;
    }
    addOffers(selectedProduct, offerPrice)
      .then(() => {
        toast.success("Offer price added successfully!");
        setIsModalOpen(false);
        setOfferPrice("");
      })
      .catch(() => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
      });
  };

  const handleRemoveOffer = (id) => {
    removeOffers(id)
      .then(() => {
        toast.success("Offer removed successfully!");
      })
      const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
  };

  return (
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
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Image</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                    <td className="py-3 px-6">{product.title}</td>
                    <td className="py-3 px-6">{categories[product.category] }</td>
                    <td className="py-3 px-6 text-yellow-600 font-medium">₹{product.price}</td>
                    <td className="py-3 px-6">
                      <img src={product.image[0]} alt="Product" className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => navigate(`/seller/productdetail/${product._id}`)} className="bg-orange-300 text-white px-4 py-2 rounded-md hover:bg-orange-400 transition">
                          View Details
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                          Delete
                        </button>
                        <button onClick={() => navigate(`/seller/updateproduct/${product._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                          Edit
                        </button>
                        <button onClick={() => { setSelectedProduct(product._id); setIsModalOpen(true); }} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                          Add Offer
                        </button>
                        <button onClick={() => handleRemoveOffer(product._id)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                          Remove Offer
                        </button>
                      </div>
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

      {/* Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 rounded-lg shadow-lg bg-[var(--card-bg)] text-[var(--text-color)]">
            <h2 className="text-xl font-semibold mb-4">Enter Offer Price</h2>
            <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="border px-4 py-2 w-full mb-4 bg-[var(--input-bg)] text-[var(--text-color)]" placeholder="Enter price..." />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition">
                Cancel
              </button>
              <button onClick={handleAddOffer} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Confirm Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;


