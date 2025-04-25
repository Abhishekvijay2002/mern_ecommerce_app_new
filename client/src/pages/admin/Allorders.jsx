
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateOrder, getAllOrders } from "../../services/UserService";

function Allorders() {
    const [allorders, setorder] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();
                setorder(res.data);
                console.log(res.data);
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
            // Update the order status in the backend
            await updateOrder(id, { orderstatus: status });

            // Update the order status locally for real-time updating
            setorder((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, orderstatus: status } : order
                )
            );

            toast.success(`Order status updated to ${status}`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update order.");
        }
    }; // <-- Closing bracket added

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Orders</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left">Order ID</th>
                            <th className="py-3 px-6 text-left">User Name</th>
                            <th className="py-3 px-6 text-left">Total Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allorders.length > 0 ? (
                            allorders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                    <td className="py-3 px-6">{order._id}</td>
                                    <td className="py-3 px-6">{order.userId.name}</td>
                                    <td className="py-3 px-6 text-yellow-600 font-medium">{order.totalamount}</td>
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
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">No orders available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Allorders;
