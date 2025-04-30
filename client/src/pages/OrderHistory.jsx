import React, { useState, useEffect } from "react";
import { getOrders, cancelOrder, Getproductbyid } from "../services/UserService";
import { toast } from "sonner";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then(async (res) => {
        console.log("API Response:", res.data);
        const enrichedOrders = await Promise.all(
          res.data.map(async (order) => ({
            ...order,
            product: await fetchProductDetails(order.product),
          }))
        );
        setOrders(enrichedOrders);
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
      });
  }, []);

  const fetchProductDetails = async (products) => {
    return await Promise.all(
      products.map(async (product) => {
        try {
          const res = await Getproductbyid(product.productid);
          console.log("Product API Response:", res.data);
          return { ...product, title: res.data.title.slice(0,50), image: res.data.image[0]};
        } catch (error) {
          console.error("Error fetching product details:", error.message);
          return { ...product, title: "Unknown", image: "" };
        }
      })
    );
  };

  const handleDelete = (id) => {
    console.log("Cancelling order with ID:", id);

    cancelOrder(id)
      .then(() => {
        toast.success("Order canceled successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, orderstatus: "Cancelled" } : order
          )
        );
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
      });
  };

  return (
    <div className="p-6 h-auto bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      <div className="overflow-x-auto border border-[var(--table-border)] rounded-lg bg-[var(--table-bg)]">
        <table
          className="min-w-full border border-[var(--table-border)] rounded-lg"
          style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}
        >
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
                      ? order.product.map((p) => (
                          <div key={p.productid} className="flex items-center space-x-2">
                            <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded" />
                            <span>{p.title}</span>
                          </div>
                        ))
                      : "No items found"}
                  </td>
                  <td className="py-3 px-4">{order.orderstatus || "Unknown"}</td>
                  <td className="py-3 px-4">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="py-3 px-4">{order.totalamount || "N/A"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 text-[var(--button-text)] px-3 py-2 rounded hover:brightness-90 transition"
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



