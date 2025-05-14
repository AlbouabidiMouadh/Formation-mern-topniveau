let router = require("express").Router();
let categorieCtrl = require("../Controllers/CatgCtrl");

let auth = require("../middleware/Auth");
let permission = require("../middleware/Permission");

router.get("/categories", auth.auth, categorieCtrl.getAllCatg);
router.post("/categorie", auth.auth, categorieCtrl.ajouterCatg);
router.put("/categorie/:id", auth.auth, categorieCtrl.modifierCatg);
router.delete("/categorie/:id", auth.auth, categorieCtrl.supprimercatg);
router.get("/categorie/:id", auth.auth, categorieCtrl.getCategById);

router.delete("/delettype", categorieCtrl.supprimerType);
router.get("/categorie", categorieCtrl.getCategorie);
router.get("/nomcategorie", categorieCtrl.getCategByNom);
router.get("/typecategorie", categorieCtrl.getCategByType);

module.exports = router;
