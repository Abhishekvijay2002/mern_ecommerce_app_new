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
        const products = Array.isArray(res.data.cart?.product)
          ? res.data.cart.product
          : [];
        setCartItems(products);
        setTotalPrice(res.data.cart?.totalprice || 0);
        toast.success("Cart fetched successfully!");
      })
      .catch(() => {
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
          toast.error("Stripe redirect failed: " + result.error.message);
        }
      } else {
        toast.error("Stripe failed to load");
      }
    } catch (error) {
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
      .catch(() => {
        toast.error("Failed to remove from cart!");
      });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="overflow-x-auto mb-10 border border-[var(--table-border)] rounded-lg bg-[var(--table-bg)]">
        <table className="w-full text-left border-separate border-spacing-y-4 sm:table-auto"
          style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
          <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item) => (
              <tr key={item._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition ">
                <td className="flex items-center space-x-4 p-4">
                  <button onClick={() => handleRemove(item.productid._id)}
                    className="text-[var(--text-color)] hover:brightness-90 transition">
                    <X className="w-5 h-5" />
                  </button>
                  <img src={item.productid.image[0]} alt={item.productid.title}
                    className="w-12 h-12 rounded" />
                  <span className="truncate max-w-xs">{item.productid.title}</span>
                </td>
                <td>${item.price}</td>
                <td>
                  <div className="flex items-center space-x-2 " >
                    <button className="px-2 py-1 border rounded bg-[var(--button-bg)] text-[var(--button-text)]">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button className="px-2 py-1 border rounded bg-[var(--button-bg)] text-[var(--button-text)]">
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

      <div className="w-full md:w-1/3 ml-auto p-4 rounded bg-[var(--card-bg)] border border-[var(--table-border)]">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Cart Total</h3>
        <div className="flex justify-between py-2 border-b">
          <span>SUBTOTAL</span>
          <span>${totalPrice}</span>
        </div>
        <button
          onClick={makePayment}
          disabled={cartItems.length === 0}
          className="w-full mt-4 bg-[var(--button-bg)] text-[var(--button-text)] py-2 rounded hover:brightness-90 disabled:opacity-50">
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

export default CartPage;

