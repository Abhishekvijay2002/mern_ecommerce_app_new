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
  const [products, setproducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await listProducts();
        setproducts(res.data);
        toast.success("Products Fetched");
      } catch (err) {
        console.error(err);
        toast.error("Error Fetching Products");
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    DeleteProduct(id)
      .then(() => {
        toast.success("Product deleted successfully!");
        setproducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete product.");
      });
  };

  const openOfferModal = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setOfferPrice("");
    setSelectedProductId(null);
  };

  const handleAddOffer = () => {
    if (!offerPrice) {
      toast.error("Please enter a valid offer price.");
      return;
    }

    addOffers(selectedProductId,  offerPrice )
      .then(() => {
        toast.success("Offer added successfully!");
        closeModal();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add offer.");
      });
  };

  const handleRemoveOffer = (id) => {
    removeOffers(id).then(() => {
        toast.success("Offer removed successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to remove offer.");
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Products</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-300 hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-6">{product.title}</td>
                  <td className="py-3 px-6">{product.category}</td>
                  <td className="py-3 px-6 text-yellow-600 font-medium">
                    ₹{product.price}
                  </td>
                  <td className="py-3 px-6">
                    <img
                      src={product.image[0]}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/admin/updateproduct/${product._id}`)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openOfferModal(product._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                      >
                        Add Offer
                      </button>
                      <button
                        onClick={() => handleRemoveOffer(product._id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                      >
                        Remove Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-3 px-6 text-center text-gray-500"
                >
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Offer Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Enter Offer Price
            </h3>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              placeholder="Enter offer price"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddOffer}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add Offer
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;


