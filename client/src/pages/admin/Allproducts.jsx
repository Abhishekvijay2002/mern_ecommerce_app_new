import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  addOffers,
  DeleteProduct,
  listProducts,
  removeOffers,
} from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await listProducts();
        setProducts(res.data);
        setFilteredProducts(res.data);
        toast.success("Products Fetched");
      } catch (err) {
        console.error(err);
        toast.error("Error Fetching Products");
      }
    };
    fetchProducts();
  }, []);

  // Search Filter Logic
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(term.toLowerCase()) ||
          product.category.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleDelete = (id) => {
    DeleteProduct(id)
      .then(() => {
        toast.success("Product deleted successfully!");
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete product.");
      });
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
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add offer price.");
      });
  };

  const handleRemoveOffer = (id) => {
    removeOffers(id)
      .then(() => {
        toast.success("Offer removed successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to remove offer.");
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Products</h2>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by product name or category..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 w-full mb-4 rounded"
      />

      {/* Scrollable Table Wrapper */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full min-w-[800px] text-left border-separate border-spacing-y-4">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{product.title}</td>
                    <td className="py-3 px-6">{product.category}</td>
                    <td className="py-3 px-6 text-yellow-600 font-medium">₹{product.price}</td>
                    <td className="py-3 px-6 flex gap-2">
                      <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Delete
                      </button>
                      <button onClick={() => navigate(`/admin/updateproduct/${product._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Edit
                      </button>
                      <button onClick={() => { setSelectedProduct(product._id); setIsModalOpen(true); }} className="bg-green-500 text-white px-4 py-2 rounded-md">
                        Add Offer
                      </button>
                      <button onClick={() => handleRemoveOffer(product._id)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Remove Offer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-6 text-center text-gray-500">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offer Price Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Enter Offer Price</h2>
            <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="border px-4 py-2 w-full mb-4" placeholder="Enter price..." />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
              <button onClick={handleAddOffer} className="bg-blue-500 text-white px-4 py-2 rounded-md">Confirm Offer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;


