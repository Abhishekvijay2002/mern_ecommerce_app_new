import React, { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import Card from "../components/Card";
import {
  getCart,
  makepaymentOnStripe,
  removeFromCart,
} from "../services/UserService";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCart()
      .then((res) => {
        console.log("Cart response:", res.data);
        const products = Array.isArray(res.data.cart?.product)
          ? res.data.cart.product
          : [];
        setCartItems(products);
        setTotalPrice(res.data.cart?.totalprice || 0);
        toast.success("Cart fetched successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch cart!");
      });
  }, []);

  const makePayment = async () => {
    const body = {
      products: cartItems.map((item) => ({
        id: item.productid._id,
        title: item.productid.title,
        price: item.price,
        quantity: item.quantity,
        image: item.productid.image,
      })),
    };

    try {
      const response = await makepaymentOnStripe(body);
      console.log("Stripe session response:", response.data); 

      const session = response.data.sessionId;

      if (!session) {
        toast.error("Failed to get sessionId from backend.");
        return;
      }

      const stripe = await stripePromise;

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: session,
        });

        if (result.error) {
          console.log(result.error.message);
          toast.error("Stripe redirect failed: " + result.error.message);
        }
      } else {
        console.log("Stripe failed to load");
        toast.error("Stripe failed to load");
      }
    } catch (error) {
      console.log("Payment Error:", error);
      toast.error("Something went wrong with payment!");
    }
  };

  const handleRemove = (productid) => {
    removeFromCart(productid)
      .then(() => {
        toast.success("Removed from cart successfully!");
        setCartItems((prev) =>
          prev.filter((item) => item.productid._id !== productid)
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove from cart!");
      });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-700 font-semibold">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item) => (
              <tr key={item._id} className="bg-gray-50 rounded-lg">
                <td className="flex items-center space-x-4 py-4">
                  <button
                    onClick={() => handleRemove(item.productid._id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  <img
                    src={item.productid.image[0]}
                    alt={item.productid.title}
                    className="w-12 h-12 rounded"
                  />
                  <span>{item.productid.title}</span>
                </td>
                <td>${item.price}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 border rounded">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button className="px-2 py-1 border rounded">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full md:w-1/3 ml-auto bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Cart Total</h3>
        <div className="flex justify-between py-2 border-b">
          <span>SUBTOTAL</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span>DISCOUNT</span>
          <span>---</span>
        </div>
        <div className="flex justify-between py-2 font-semibold">
          <span>TOTAL</span>
          <span>${totalPrice}</span>
        </div>
        <button
          onClick={makePayment}
          disabled={cartItems.length === 0}
          className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

export default CartPage;
