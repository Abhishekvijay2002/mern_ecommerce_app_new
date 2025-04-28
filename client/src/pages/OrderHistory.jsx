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
            ? { ...order, orderstatus: "Cancelled" }
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
    <div className="p-6 h-auto bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      <div className="overflow-x-auto border border-[var(--table-border)] rounded-lg bg-[var(--table-bg)]">
        <table className="min-w-full border border-[var(--table-border)] rounded-lg"
          style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
          <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
            <tr>
              <th className="py-3 px-4 text-left">Order No</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Delivery Date</th>
              <th className="py-3 px-4 text-left">Total Price</th>
              <th className="py-3 px-4 text-left">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-t border-[var(--table-border)] hover:bg-opacity-90 transition">
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
                      className="bg-red-500  text-[var(--button-text)] px-3 py-2 rounded hover:brightness-90 transition"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-[var(--table-text-color)]">
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



