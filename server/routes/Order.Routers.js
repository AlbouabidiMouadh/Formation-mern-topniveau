const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderCtrl");

// Create Order
router.post("/order", orderController.createOrder);

// Get Orders
router.get("/orders", orderController.getAllOrders);
router.get("/order/:id", orderController.getOrderById);
router.get("/order/user/:userId", orderController.getUserOrders);

// Update Order
router.put("/order/:id", orderController.updateOrderStatus);

// Delete Order
router.delete("/order/:id", orderController.deleteOrder);

module.exports = router;
