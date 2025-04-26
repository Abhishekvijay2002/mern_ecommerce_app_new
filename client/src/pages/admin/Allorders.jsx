
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateOrder, getAllOrders } from "../../services/UserService";

function AllOrders() {
    const [allOrders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();
                setOrders(res.data);
                toast.success("Orders Fetched");
            } catch (err) {
                console.error(err);
                toast.error("Error Fetching Orders");
            }
        };
        fetchOrders();
    }, []);

    const handleUpdate = async (id, status) => {
        try {
            await updateOrder(id, { orderstatus: status });

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, orderstatus: status } : order
                )
            );

            toast.success(`Order status updated to ${status}`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen overflow-hidden">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Orders</h2>

            {/* Scrollable Table Wrapper */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full min-w-[1000px] text-left border-separate border-spacing-y-4">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">User Name</th>
                                <th className="py-3 px-6 text-left">Total Amount</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Payment Method</th>
                                <th className="py-3 px-6 text-left">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.length > 0 ? (
                                allOrders.map((order) => (
                                    <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                        <td className="py-3 px-6">{order._id}</td>
                                        <td className="py-3 px-6">{order.userId.name}</td>
                                        <td className="py-3 px-6 text-yellow-600 font-medium">₹{order.totalamount}</td>
                                        <td className="py-3 px-6 text-center">
                                            <select
                                                value={order.orderstatus}
                                                onChange={(e) => handleUpdate(order._id, e.target.value)}
                                                className="p-2 border border-gray-300 rounded-md"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-6">{order.paymentMethod || "N/A"}</td>
                                        <td className="py-3 px-6">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-3 px-6 text-center text-gray-500">No orders available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllOrders;

