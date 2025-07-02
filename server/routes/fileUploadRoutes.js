const express = require("express");
const router = express.Router();
const {
  uploadProductImage,
  uploadProfilePicture,
} = require("../Controllers/fileUploadController");

router.post("/upload-product", uploadProductImage);
router.post("/upload-profile", uploadProfilePicture);

module.exports = router;
