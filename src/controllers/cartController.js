const Cart = require("../models/cartModel");

const getAll = async (req, res) => {
  const cart = await Cart.find();
  if(!cart) {
    return res.status(404).json({message : "not/found"})
  }
  return res.status(200).json({ dataAll: cart });
};

const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const cartData = {
      products: cart.products
        .map((item) => {
          if (!item.productId) {
            return null;
          }
          return {
            productId: item.productId._id,
            namePro: item.productId.namePro,
            pricePro: item.productId.pricePro,
            imgPro: item.productId.thumbnail,
            quantity: item.quantity,
          };
        })
        .filter((product) => product !== null),
    };
    
    return res.status(200).json(cartData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (product) =>
        product.productId && product.productId.toString() !== productId
    );

    await cart.save();
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateProductQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.quantity = quantity;
    await cart.save();
    return res.status(200).json({ cart });
  } catch (error) {}
};

const increaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity++;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const decreaseProductQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (product.quantity > 1) {
      product.quantity--;
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getCartByUserId: getCartByUserId,
  removeFromCart: removeFromCart,
  updateProductQuantity: updateProductQuantity,
  decreaseProductQuantity: decreaseProductQuantity,
  increaseProductQuantity: increaseProductQuantity,
  addItemToCart: addItemToCart,
  getAll: getAll,
};
