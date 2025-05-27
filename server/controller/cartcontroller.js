const cartModel = require("../models/cartModels");
const productModel = require("../models/productM0del"); 

const addToCart = async (req, res) => {
    try {
        const userid = req.userId.id;
        const productid = req.params.productid;

        console.log("User ID:", userid);
        console.log("Product ID:", productid);

        const product = await productModel.findById(productid);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        let cart = await cartModel.findOne({ userid });

        if (!cart) {
            cart = new cartModel({ userid, product: [] });
        }

        const productAlreadyExist = cart.product.some((item) => item.productid.equals(productid));
        if (productAlreadyExist) {
            return res.status(400).json({ error: "Product already exists in cart" });
        }

        cart.product.push({ productid, price: product.price, quantity: 1 });
        cart.calculateTotalprice();
        await cart.save();

        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" });
    }
};

const getcart = async (req, res) => {
    try {
        const userid = req.userId.id;
        const cart = await cartModel.findOne({ userid }).populate("product.productid"); // ✅ will now work
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.status(200).json({ message: "Cart found", cart });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" });
    }
};

const removefromcart = async (req, res) => {
    try {
        const userid = req.userId.id;
        const { productid } = req.params;

        let cart = await cartModel.findOne({ userid });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.product = cart.product.filter((item) => !item.productid.equals(productid));
        cart.calculateTotalprice();
        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send({ message: error.message || "Internal Server Error" });
    }
};

const increasequantity = async (req, res) => {
  try {
    const userid = req.userId.id;
    const { productid } = req.params;

    const cart = await cartModel.findOne({ userid });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const productInCart = cart.product.find(p => p.productid.equals(productid));
    if (!productInCart) return res.status(404).json({ error: "Product not in cart" });

    productInCart.quantity += 1;
    
    cart.totalprice = cart.product.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ message: "Quantity increased", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const decreasequantity = async (req, res) => {
  try {
    const userid = req.userId.id;
    const { productid } = req.params;

    const cart = await cartModel.findOne({ userid });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const productIndex = cart.product.findIndex(p => p.productid.equals(productid));
    if (productIndex === -1) return res.status(404).json({ error: "Product not in cart" });

    // Decrease quantity or remove product if quantity is 1
    if (cart.product[productIndex].quantity > 1) {
      cart.product[productIndex].quantity -= 1;
    } else {
      // Remove product if quantity is 1 and decrease requested
      cart.product.splice(productIndex, 1);
    }

    // Recalculate total price
    cart.totalprice = cart.product.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ message: "Quantity decreased", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { addToCart, getcart, removefromcart ,decreasequantity ,increasequantity };
