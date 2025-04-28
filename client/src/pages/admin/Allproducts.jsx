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
      .catch(() => toast.error("Failed to delete product."));
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
      .catch(() => toast.error("Failed to add offer price."));
  };

  const handleRemoveOffer = (id) => {
    removeOffers(id)
      .then(() => {
        toast.success("Offer removed successfully!");
      })
      .catch(() => toast.error("Failed to remove offer."));
  };

  return (
    <div className="p-6 min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by product name or category..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 w-full mb-4 rounded bg-[var(--input-bg)] text-[var(--text-color)]"
      />

      {/* Table Wrapper */}
      <div className="shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)] bg-[var(--table-bg)]">
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full min-w-[800px] text-left border-separate border-spacing-y-4"
            style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
            <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
              <tr>
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                    <td className="py-3 px-6">{product.title}</td>
                    <td className="py-3 px-6">{product.category}</td>
                    <td className="py-3 px-6 text-yellow-600 font-medium">₹{product.price}</td>
                    <td className="py-3 px-6 flex gap-2">
                      <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                        Delete
                      </button>
                      <button onClick={() => navigate(`/admin/updateproduct/${product._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Edit
                      </button>
                      <button onClick={() => { setSelectedProduct(product._id); setIsModalOpen(true); }} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                        Add Offer
                      </button>
                      <button onClick={() => handleRemoveOffer(product._id)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                        Remove Offer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-6 text-center text-[var(--table-text-color)]">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Offer Price Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" p-6 rounded-lg shadow-lg bg-[var(--card-bg)] text-[var(--text-color)]">
            <h2 className="text-xl font-semibold mb-4">Enter Offer Price</h2>
            <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="border px-4 py-2 w-full mb-4 bg-[var(--input-bg)] text-[var(--text-color)]" placeholder="Enter price..." />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition">Cancel</button>
              <button onClick={handleAddOffer} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Confirm Offer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;



