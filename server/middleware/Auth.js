const express = require('express');
const jwt = require('jsonwebtoken');

const Authentication = {
  auth: async (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).json({
          message: "Veuillez vous connecter",
          error: true,
          success: false,
        });
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.error('Erreur d’authentification:', err);
          return res.status(401).json({
            message: "Token invalide ou expiré",
            error: true,
            success: false,
          });
        }

        req.admin = decoded?._id;
        next();
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Erreur serveur",
        error: true,
        success: false,
      });
    }
  }
};

module.exports = Authentication;
