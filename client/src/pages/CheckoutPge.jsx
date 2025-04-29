import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addOrder } from "../services/UserService";

const OrderPage = () => {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleOrderSubmit = async () => {
        setLoading(true);
        addOrder({ address })
            .then((res) => {
                console.log(res);
                toast.success("Order placed successfully!");
                navigate("/success");
            })
            .catch((err) => {
                toast.error(err.error || "Order failed!");
                console.log(err.response?.data?.error || "Order failed!");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="bg-[var(--card-bg)] text-[var(--text-color)] p-6 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    ✅ Payment Successful
                </h2>
                <p className="text-center text-sm text-placeholder-text-color mb-4">
                    Please enter your address to complete the order.
                </p>
                <textarea
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
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



