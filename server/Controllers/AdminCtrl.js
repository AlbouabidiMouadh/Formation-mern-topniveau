const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AdminCtrl = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Vérification des entrées
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email et mot de passe requis" });
      }

      // Recherche de l'admin
      const findAdmin = await Admin.findOne({ email });
      if (!findAdmin) {
        return res.status(401).json({ message: "Email incorrect" });
      }

      // Vérification du mot de passe
      const compare = await bcrypt.compare(password, findAdmin.password);
      if (!compare) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Création du token JWT
      const tokenData = {
        _id: findAdmin._id,
        email: findAdmin.email,
      };
      const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h", // Plus lisible que 60*60*2
      });

      // Options du cookie
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      const responsePayload = {
        token: token,
        admin: {
          id: findAdmin.id,
          email: findAdmin.email,
          name: findAdmin.name,
          role: findAdmin.role,
        },
      };

      // Réponse avec cookie et JSON
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Connexion réussie",
        data: responsePayload,
        success: true,
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Erreur serveur lors de la connexion",
        success: false,
        error: true,
      });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({
        message: "Déconnexion réussie",
        error: false,
        success: true, // Correction de "susccess"
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Erreur lors de la déconnexion",
        error: true,
        success: false, // Correction de "susccess"
      });
    }
  },
};

module.exports = AdminCtrl;
