const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserCtrl");

// Auth
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);

// User
router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUser);
router.put("/user/:id", userController.updateUser);

// Cart
router.post("/user/cart", userController.addToCart);
router.get("/user/cart/:id", userController.getCart);
router.delete("/user/cart", userController.removeFromCart);

module.exports = router;
