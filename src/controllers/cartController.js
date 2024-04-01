const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Nếu không tìm thấy giỏ hàng, tạo mới một giỏ hàng rỗng
      cart = new Cart({ userId, products: [] });
    }
    // Tìm xem sản phẩm có tồn tại trong giỏ hàng không
    const existProIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existProIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng sản phẩm
      cart.products[existProIndex].quantity += quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
      cart.products.push({ productId, quantity });
    }
    // Lưu lại thông tin giỏ hàng
    await cart.save();
    return res.status(200).json({ newcart: cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getOneCart = async (req, res) => {
  const { userId } = req.params;
  try {
    // Tìm giỏ hàng của người dùng và populate thông tin sản phẩm
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Chuyển đổi dữ liệu để trả về
    const data = {
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
      })),
    };

    console.log(data);
    return res.status(200).json({ products: data.products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ error: "not/found" });
    }
    cart.products = cart.products.fillter(
      (product) =>
        product.productId && product.productId.toString() !== productId
    );
    await cart.save();
    return res.status(200).json({ "delete sucess !": cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let carts = await Cart.findOne({ userId });
    if (!carts) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    const product = carts.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    product.quantity = quantity;
    await carts.save();
    return res.status(StatusCodes.OK).json({"udpate" : carts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getOneCart:getOneCart, addToCart:addToCart, deleteCart: deleteCart, updateCart: updateCart };
