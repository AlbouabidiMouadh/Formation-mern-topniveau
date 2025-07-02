// Load environment variables
require("dotenv").config();

// Core dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");

// App initialization
const app = express();

// MongoDB Configuration
mongoose.set("strictQuery", true);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.url_front,
    credentials: true,
  })
);

// Static folder for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default route
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API !");
});

// Models
const adminModel = require("./models/AdminModel");

// Routers
const adminRouter = require("./routes/Admin.Routers");
const catgRouter = require("./routes/Catg.Routers");
const produitsRouter = require("./routes/Produit.Routers");
const userRouter = require("./routes/User.Routers");
const orderRouter = require("./routes/Order.Routers");
const fileUploadRouter = require("./routes/fileUploadRoutes");

// Register all routers under /api
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", catgRouter);
app.use("/api", adminRouter);
app.use("/api", produitsRouter);
app.use("/api/files", fileUploadRouter); // for uploads

// MongoDB Connection
const connectDB = async () => {
  try {
     await mongoose.connect(process.env.mongo_url, {
    //await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connecté à MongoDB");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB:", error);
    process.exit(1);
  }
};

// Ensure default admin exists
const createAdmin = async () => {
  try {
    const existingAdmin = await adminModel.findOne();
    if (!existingAdmin) {
      const defaultPassword = "admin@1234";
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await adminModel.create({
        nom: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created.");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

// Start server after DB connection
connectDB()
  .then(createAdmin)
  .then(() => {
    const PORT = process.env.port || 3200;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
  });
