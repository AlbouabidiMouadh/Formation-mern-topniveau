const mongoose = require("mongoose");

const ProduitSchema = mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  imageUrl: String,
  price: Number,
  description: String,
  discount: Number,
  quantite: Number,
});

module.exports = mongoose.model("produit", ProduitSchema);
