const API_BASE_URL = "http://localhost:3010/api";

export const endpoint = {
  login: `${API_BASE_URL}/login`,

  // categorie
  getAllCategorie: `${API_BASE_URL}/categories`,
  addCategorie: `${API_BASE_URL}/categorie`,
  categorieById: (id) => `${API_BASE_URL}/categorie/${id}`,
};
