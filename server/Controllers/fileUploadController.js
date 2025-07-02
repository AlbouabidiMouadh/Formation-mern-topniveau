const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Util function to create storage engine dynamically
const createStorage = (folderName) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./uploads/${folderName}`;
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });
};

// Product image upload handler
exports.uploadProductImage = (req, res) => {
  const upload = multer({ storage: createStorage("products") }).single("image");

  upload(req, res, function (err) {
    if (err) return res.status(500).json({ message: "Upload failed", error: err.message });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.status(200).json({
      message: "Product image uploaded successfully",
      filePath: `/uploads/products/${req.file.filename}`,
    });
  });
};

// Profile picture upload handler
exports.uploadProfilePicture = (req, res) => {
  const upload = multer({ storage: createStorage("profiles") }).single("image");

  upload(req, res, function (err) {
    if (err) return res.status(500).json({ message: "Upload failed", error: err.message });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      filePath: `/uploads/profiles/${req.file.filename}`,
    });
  });
};
