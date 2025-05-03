let router = require("express").Router();
let categorieCtrl = require("../Controllers/CatgCtrl");

let auth=require('../middleware/Auth')
let permission=require('../middleware/Permission')

router.post("/ajoutercatg", categorieCtrl.ajouterCatg);
router.put("/modifiercatg/:id", categorieCtrl.modifierCatg);
router.delete("/delettype", categorieCtrl.supprimerType);
router.get("/categorie",auth.auth,permission.PermissionAdmin, categorieCtrl.getAllCatg);
router.get("/categorie/:id", categorieCtrl.getCategById);
router.get("/nomcategorie", categorieCtrl.getCategByNom);
router.get("/typecategorie", categorieCtrl.getCategByType);
router.delete("/categorie/:id", categorieCtrl.supprimercatg);
router.get("/categories", categorieCtrl.getCategorie);



module.exports = router;
