const Produit = require("../models/ProduitModel");

const produitController = {
  // Get all products
  getAllProduit: async (req, res) => {
    try {
      const produits = await Produit.find();
      res.status(200).json({
        msg: "Tous les produits ont été récupérés avec succès",
        data: produits,
        success: true,
        error: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue",
        success: false,
        error: true,
      });
    }
  },

  // Get a product by ID
  getProduitById: async (req, res) => {
    try {
      const { id } = req.params;
      const produit = await Produit.findById(id);
      if (!produit) {
        return res.status(404).json({
          msg: "Le produit que vous cherchez n'a pas été trouvé",
          success: false,
          error: true,
        });
      }
      res.status(200).json({
        data: produit,
        msg: "Le produit a été trouvé",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue",
        success: false,
        error: true,
      });
    }
  },

  // Delete a product by ID
  deleteProduitById: async (req, res) => {
    try {
      const { id } = req.params;
      const produit = await Produit.findByIdAndDelete(id);
      if (!produit) {
        return res.status(404).json({
          msg: "Le produit que vous cherchez n'a pas été trouvé",
          success: false,
          error: true,
        });
      }
      res.status(200).json({
        msg: "Le produit a été supprimé avec succès",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue",
        success: false,
        error: true,
      });
    }
  },

  // Update a product by ID
  updateProduitById: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const produit = await Produit.findByIdAndUpdate(id, updates, { new: true });
      if (!produit) {
        return res.status(404).json({
          msg: "Le produit que vous cherchez n'a pas été trouvé",
          success: false,
          error: true,
        });
      }
      res.status(200).json({
        data: produit,
        msg: "Le produit a été mis à jour",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue",
        success: false,
        error: true,
      });
    }
  },

  // Create a new product
  createProduit: async (req, res) => {
    try {
      const produitData = req.body;
      const newProduit = new Produit(produitData);
      const savedProduit = await newProduit.save();
      res.status(201).json({
        data: savedProduit,
        msg: "Le produit a été créé avec succès",
        success: true,
        error: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue",
        success: false,
        error: true,
      });
    }
  },

  // Get products by category
  getProduitsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const produits = await Produit.find({ category });
      res.status(200).json({
        data: produits,
        msg: `Les produits de la catégorie '${category}' ont été récupérés`,
        success: true,
        error: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: error.message || "Une erreur est survenue",
        success: false,
        error: true,
      });
    }
  },
};

module.exports = produitController;
