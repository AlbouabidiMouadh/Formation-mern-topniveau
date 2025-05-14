const Produit = require("../models/ProduitModel");

const produitController = {
  getAllProduit: async (req, res) => {
    try {
      const produits = await Produit.find();
      res.status(200).json({
        msg: "all products fetched in success",
        data: produits,
        success: true,
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message || "Un erreur a ete survenu",
        success: false,
        error: true,
      });
    }
  },
  getProduitById: async (req, res) => {
    try {
      const { id } = req.params;
      const findedProduit = await Produit.findById(id);
      if (!findedProduit)
        return res.status(404).json({
          msg: "Le produit que vous chercher n'est pas trouver",
          success: false,
          error: true,
        });
      return res.status(201).json({
        data: findedProduit,
        msg: "le produit est trouve",
        success: true,
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message || "Un erreur a ete survenu",
        success: false,
        error: true,
      });
    }
  },
  deleteProduitById: async (req, res) => {
    try {
      const { id } = req.params;
      const findedProduit = await Produit.findByIdAndDelete(id);
      if (!findedProduit)
        return res.status(404).json({
          msg: "Le produit que vous chercher n'est pas trouver",
          success: false,
          error: true,
        });
      return res.status(201).json({
        msg: "le produit est supprimer",
        success: true,
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message || "Un erreur a ete survenu",
        success: false,
        error: true,
      });
    }
  },
  updateProduitById: async (req, res) => {
    try {
      const { id } = req.params;
      const produit = req.body;
      const findedProduit = await Produit.findByIdAndUpdate(id, produit);
      if (!findedProduit)
        return res.status(404).json({
          msg: "Le produit que vous chercher n'est pas trouver",
          success: false,
          error: true,
        });
      return res.status(201).json({
        data: findedProduit,
        msg: "le produit est met a jour",
        success: true,
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message || "Un erreur a ete survenu",
        success: false,
        error: true,
      });
    }
  },
  createProduit: async (req, res) => {
    try {
      const { id } = req.params;
      const produit = req.body;
      const newProduit = new Produit(produit)
      
      return res.status(201).json({
        data: findedProduit,
        msg: "le produit est met a jour",
        success: true,
        error: false,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message || "Un erreur a ete survenu",
        success: false,
        error: true,
      });
    }
  },
  
};
module.exports = produitController;
