const Order = require('../models/orderModel');
const Cart = require('../models/cartModels');
const mongoose = require("mongoose");
const productM0del = require('../models/productM0del');

const addOrder = async (req, res) => {
    try {
        const userid = new mongoose.Types.ObjectId(req.userId.id);
        const { address } = req.body;

        const cart = await Cart.findOne({ userid }).populate("product.productid");

        if (!cart || cart.product.length === 0) {
            return res.status(400).json({ error : "Cart is empty" });
        }

        const totalAmount = cart.product.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = new Order({
            userId: userid,
            product: cart.product.map(item => ({
                productid: item.productid, 
                price: item.price,
                quantity: item.quantity
            })),
            totalamount: totalAmount,
            address,
            orderstatus: 'pending'
        });

        await order.save();

        for (const item of cart.product) {
            const productId = item.productid._id;
            const quantity = item.quantity;

            await productM0del.findByIdAndUpdate(productId, {
                $inc: {
                    stock: -quantity,
                    salesCount: quantity
                }
            });
        }

        await Cart.findOneAndDelete({ userid });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId.id);
        console.log("Fetching orders for:", userId);

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ error : "No orders found for this user." });
        }

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderstatus } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(id, { orderstatus }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Intenal Server Error" })
    }
};
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ error : "Order not found" });
        }

        if (order.orderstatus !== "pending") {
            return res.status(400).json({ error : "Order cannot be canceled" });
        }

        order.orderstatus = "cancelled";
        await order.save();

        // Loop through each product in the order to revert stock and salesCount
        for (const item of order.product) {
            await productM0del.findByIdAndUpdate(item.productid, {
                $inc: {
                    stock: item.quantity,
                    salesCount: -item.quantity
                }
            });
        }

        res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
};


module.exports = {
    addOrder,
    getOrders,
    getAllOrders,
    updateOrder,
    cancelOrder,
};
