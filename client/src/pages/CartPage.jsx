import React, { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import {
  getCart,
  makepaymentOnStripe,
  removeFromCart,
  increaseQuantityofProduct,
  decreaseQuantityofProduct,
} from "../services/UserService";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingIds, setLoadingIds] = useState(new Set()); // to disable buttons while loading

  // Fetch cart on mount
  const fetchCart = () => {
    getCart()
      .then((res) => {
        const products = Array.isArray(res.data.cart?.product)
          ? res.data.cart.product
          : [];
        setCartItems(products);
        setTotalPrice(res.data.cart?.totalprice || 0);
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
        toast.error(errorMsg);
        console.error(errorMsg);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateLoading = (id, adding) => {
    setLoadingIds((prev) => {
      const newSet = new Set(prev);
      if (adding) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
  };

  // Increase quantity handler
  const handleIncrease = async (productid) => {
    try {
      updateLoading(productid, true);
      await increaseQuantityofProduct(productid);
      // Refresh cart after update
      fetchCart();
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to increase quantity";
      toast.error(errorMsg);
    } finally {
      updateLoading(productid, false);
    }
  };

  // Decrease quantity handler
  const handleDecrease = async (productid, currentQty) => {
    try {
      if (currentQty <= 1) {
        // If quantity will go to zero, remove item instead
        await handleRemove(productid);
        return;
      }
      updateLoading(productid, true);
      await decreaseQuantityofProduct(productid);
      fetchCart();
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to decrease quantity";
      toast.error(errorMsg);
    } finally {
      updateLoading(productid, false);
    }
  };

  // Remove item from cart
  const handleRemove = async (productid) => {
    try {
      updateLoading(productid, true);
      await removeFromCart(productid);
      toast.success("Removed from cart successfully!");
      setCartItems((prev) => prev.filter((item) => item.productid._id !== productid));
      // Also update total price to reflect removal immediately
      setTotalPrice((prevTotal) => {
        const item = cartItems.find((i) => i.productid._id === productid);
        if (!item) return prevTotal;
        return prevTotal - item.price * item.quantity;
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to remove item";
      toast.error(errorMsg);
    } finally {
      updateLoading(productid, false);
    }
  };

  // Payment handler
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

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="overflow-x-auto mb-10 border border-[var(--table-border)] rounded-lg bg-[var(--table-bg)]">
        <table
          className="w-full text-left border-separate border-spacing-y-4 sm:table-auto"
          style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}
        >
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
              <tr
                key={item.productid._id}
                className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition"
              >
                <td className="flex items-center space-x-4 p-4">
                  <button
                    onClick={() => handleRemove(item.productid._id)}
                    className="text-[var(--text-color)] hover:brightness-90 transition"
                    disabled={loadingIds.has(item.productid._id)}
                    aria-label="Remove product"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img src={item.productid.image[0]} alt={item.productid.title} className="w-12 h-12 rounded" />
                  <span className="truncate max-w-xs">{item.productid.title}</span>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrease(item.productid._id, item.quantity)}
                      disabled={loadingIds.has(item.productid._id)}
                      aria-label="Decrease quantity"
                      className="p-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.productid._id)}
                      disabled={loadingIds.has(item.productid._id)}
                      aria-label="Increase quantity"
                      className="p-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            {cartItems.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full md:w-1/3 ml-auto p-4 rounded bg-[var(--card-bg)] border border-[var(--table-border)]">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Cart Total</h3>
        <div className="flex justify-between py-2 border-b">
          <span>SUBTOTAL</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={makePayment}
          disabled={cartItems.length === 0}
          className="w-full mt-4 bg-[var(--button-bg)] text-[var(--button-text)] py-2 rounded hover:brightness-90 disabled:opacity-50"
        >
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};

export default CartPage;
