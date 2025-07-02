const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "yoursecret"; // Use environment variable in production

const userCtrl = {
  // Register
  register: async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
      res.json({
        token,
        user: { id: user._id, email: user.email, name: user.firstname },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get user by ID
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find().select("-password");
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get user by ID
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update user info
  updateUser: async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add to Cart
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      const user = await User.findById(userId);
      const itemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        user.cart[itemIndex].quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }

      await user.save();
      res.json(user.cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get Cart
  getCart: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate(
        "cart.productId"
      );
      res.json(user.cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const { userId, productId } = req.body;

      const user = await User.findById(userId);
      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId
      );
      await user.save();

      res.json(user.cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
module.exports = userCtrl;
