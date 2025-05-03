let mongoose = require("mongoose");

let categorieShema = new mongoose.Schema({
  NomCategorie: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("categorie", categorieShema);
