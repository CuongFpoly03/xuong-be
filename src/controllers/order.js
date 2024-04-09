const Order = require("../models/order");

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, customerName, orderNumber } = req.body;

        // Kiểm tra xem trường "items" có dữ liệu hợp lệ không
        if (!Array.isArray(items)) {
            throw new Error('Invalid "items" data. Expected an array.');
        }
        // Tạo một đối tượng đơn hàng mới từ dữ liệu được gửi từ client
        const order = new Order({ 
            userId, 
            items, 
            totalPrice,
            customerName,
            orderNumber
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        // Trả về lỗi nếu có lỗi xảy ra trong quá trình xử lý
        res.status(500).json({ message: error.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const { userId, items, totalPrice, status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { userId, items, totalPrice, status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOrders: getAllOrders,
    getOrderById: getOrderById,
    deleteOrder: deleteOrder,
    updateOrder: updateOrder,
    createOrder: createOrder
}