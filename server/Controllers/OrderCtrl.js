const Order = require("../models/OrderModel");
const User = require("../models/UserModel");

const orderCtrl = {
  // Create Order
  createOrder: async (req, res) => {
    try {
      const { userId, items, total, shippingAddress, paymentMethod } = req.body;

      const newOrder = new Order({
        userId,
        items,
        total,
        shippingAddress,
        paymentMethod,
        status: "pending",
        paymentStatus: "pending",
      });

      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate("userId", "firstname email");
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "userId",
        "firstname email"
      );
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get orders for a specific user
  getUserOrders: async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId }).sort({
        createdAt: -1,
      });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const { status, paymentStatus } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status, paymentStatus },
        { new: true }
      );
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete order
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = orderCtrl;
