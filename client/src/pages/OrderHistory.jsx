import React, { useState, useEffect } from "react";
import { cancelOrder, getOrders } from "../services/UserService";
import { toast } from "sonner";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((res) => {
        console.log("API Response:", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error:", err.message);
        alert("Failed to fetch order history");
      });
  }, []);

  const handleDelete = (id) => {
    console.log("Cancelling order with ID:", id);
    
    cancelOrder(id).then(() => {
        toast.success("Order canceled successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id
              ? { ...order, orderstatus: "Cancelled" } // Update status
              : order
          )
        );
      })
      .catch((error) => {
        console.error("Error canceling order:", error.message);
        toast.error("Failed to cancel order.");
      });
  };

  return (
    <div className="p-6 h-115">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      <div className="overflow-y-auto max-h-80 border border-gray-300 rounded-lg">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Order No</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Delivery Date</th>
              <th className="py-3 px-4 text-left">Total Price</th>
              <th className="py-3 px-4 text-left">Actions</th> 
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">{order._id || "N/A"}</td>
                  <td className="py-3 px-4">
                    {Array.isArray(order.product)
                      ? order.product.map((p) => p.productid).join(", ")
                      : "No items found"}
                  </td>
                  <td className="py-3 px-4">{order.orderstatus || "Unknown"}</td>
                  <td className="py-3 px-4">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">{order.totalamount || "N/A"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-950 transition"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
