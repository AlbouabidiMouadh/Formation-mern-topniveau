const API_BASE_URL = "http://localhost:3010/api";
const API_BASE_URL_BASE = "http://localhost:3010";

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
  imageUploadProduit: `${API_BASE_URL}/files/upload-product`,
  imageReadProduit: (imgUrl) =>  `${API_BASE_URL_BASE}${imgUrl}`,

  // users
  getAllUsers: `${API_BASE_URL}/users`,
  addUser: `${API_BASE_URL}/user`,
  userById: (id) => `${API_BASE_URL}/user/${id}`,
  
  // orders
  getAllOrders: `${API_BASE_URL}/orders`,
  addOrder: `${API_BASE_URL}/order`,
  orderById: (id) => `${API_BASE_URL}/order/${id}`,


};
