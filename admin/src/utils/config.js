const API_BASE_URL = "http://localhost:3010/api";

export const endpoint = {
  login: `${API_BASE_URL}/login`,

  // categorie
  getAllCategorie: `${API_BASE_URL}/categories`,
  addCategorie: `${API_BASE_URL}/categorie`,
  categorieById: (id) => `${API_BASE_URL}/categorie/${id}`,

  // produit
  getAllProduit: `${API_BASE_URL}/produits`,
  addProduit: `${API_BASE_URL}/produit`,
  produitById: (id) => `${API_BASE_URL}/produit/${id}`,
};
