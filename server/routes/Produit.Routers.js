let router = require("express").Router();
let produitCtrl = require("../Controllers/ProduitCtrl");

let auth = require("../middleware/Auth");
let permission = require("../middleware/Permission");

router.get("/produits", produitCtrl.getAllProduit);
router.get("/produits/category/:category", produitCtrl.getProduitsByCategory);
router.get("/produit/:id", produitCtrl.getProduitById);
router.post("/produit", auth.auth, produitCtrl.createProduit);
router.put("/produit/:id", auth.auth, produitCtrl.updateProduitById);
router.delete("/produit/:id", auth.auth, produitCtrl.deleteProduitById);

module.exports = router;
