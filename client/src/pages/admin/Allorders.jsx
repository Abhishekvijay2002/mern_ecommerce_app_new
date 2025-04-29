import { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateOrder, getAllOrders, Getproductbyid } from "../../services/UserService";

function AllOrders() {
    const [allOrders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();
                let orders = res.data;

                // Fetch product details for each order
                const enrichedOrders = await Promise.all(
                    orders.map(async (order) => {
                        if (order.product.length > 0) {
                            const productDetails = await Promise.all(
                                order.product.map(async (product) => {
                                    try {
                                        const productRes = await Getproductbyid(product.productid);
                                        return {
                                            ...product,
                                            title: productRes.data.title,
                                            image: productRes.data.image // Assuming 'image' exists in product data
                                        };
                                    } catch (error) {
                                        console.error(`Error fetching product ${product.productid}:`, error);
                                        return { ...product, title: "Unknown Product", image: "" };
                                    }
                                })
                            );
                            return { ...order, product: productDetails };
                        }
                        return order;
                    })
                );

                setOrders(enrichedOrders);
                toast.success("Orders & Products Fetched");
            } catch (err) {
                console.error("Error Fetching Orders:", err);
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
            console.error("Update Error:", error);
            toast.error("Failed to update order.");
        }
    };

    return (
        <div className="p-6 min-h-screen overflow-hidden">
            <h2 className="text-2xl font-semibold mb-4">All Orders</h2>

            {/* Scrollable Table Wrapper */}
            <div className="shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-y-auto max-h-[600px]">
                    <table className="w-full text-left border-separate border-spacing-y-4"
                        style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
                        <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
                            <tr>
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Products</th>
                                <th className="py-3 px-6 text-left">User Name</th>
                                <th className="py-3 px-6 text-left">Total Amount</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.length > 0 ? (
                                allOrders.map((order) => (
                                    <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                        <td className="py-3 px-6">{order._id}</td>
                                        <td className="py-3 px-6">
                                            {order.product.map((prod) => (
                                                <div key={prod._id} className="flex items-center gap-2">
                                                    {prod.image && (
                                                        <img src={prod.image[0]} alt={prod.title} className="w-12 h-12 object-cover rounded-md"/>
                                                    )}
                                                    <span>{prod.title.slice(0,50)}</span>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-3 px-6">{order.userId?.name || "Unknown"}</td>
                                        <td className="py-3 px-6 text-yellow-600 font-medium">₹{order.totalamount}</td>
                                        <td className="py-3 px-6 text-center">
                                            <select value={order.orderstatus}
                                                onChange={(e) => handleUpdate(order._id, e.target.value)}
                                                className="p-2 border border-gray-300 rounded-md">
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-6">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-3 px-6 text-center">No orders available</td>
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
