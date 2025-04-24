import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addOrder } from "../services/UserService";

const OrderPage = () => {
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOrderSubmit = async () => {
        setLoading(true);
        addOrder({address})
            .then((res) => {
                console.log(res);
                toast.success("Order placed successfully!");
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.response?.data?.error || "Order failed!");
                console.log(err.response?.data?.error || "Order failed!");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Place Your Order</h2>
                <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    onClick={handleOrderSubmit} 
                    className={`w-full py-2 rounded-md font-semibold transition ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Submit Order"}
                </button>
            </div>
        </div>
    );
};

export default OrderPage;


