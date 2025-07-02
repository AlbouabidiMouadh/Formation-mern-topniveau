import React, { useState } from "react";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { endpoint } from "../../utils/config";
import axios from "axios";

function AjouterProduit({ onClose, fetchdata, categories }) {
  const [produit, setProduit] = useState({
    name: "",
    brand: "",
    category: "",
    price: 0,
    description: "",
    discount: 0,
    quantite: 0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discount" || name === "quantite"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setIsUploading(true);
      const res = await axios.post(endpoint.imageUploadProduit, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.filePath;
    } catch (err) {
      toast.error("Échec de l'envoi de l'image");
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, brand, category, price } = produit;

    if (!name || !brand || !category || !price) {
      toast.error("Tous les champs obligatoires doivent être remplis");
      return;
    }

    const imageUrl = await uploadImage();
    if (!imageUrl && imageFile) return;

    try {
      const response = await axios.post(
        endpoint.addProduit,
        { ...produit, imageUrl },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data?.msg || "Produit ajouté avec succès");
      onClose();
      fetchdata();

      setProduit({
        name: "",
        brand: "",
        category: "",
        imageUrl: "",
        price: 0,
        description: "",
        discount: 0,
        quantite: 0,
      });
      setImageFile(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur inattendue, veuillez réessayer"
      );
    }
  };

  return (
    <div className="fixed min-h-screen flex flex-col justify-center md:absolute sm:py-12 z-50">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative font-serif px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Ajouter Produit</h1>
              <div
                className="text-2xl hover:text-red-500 cursor-pointer"
                onClick={onClose}
              >
                <CgClose />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-2 p-4">
              <label htmlFor="name">Nom du Produit</label>
              <input
                type="text"
                id="name"
                name="name"
                value={produit.name}
                onChange={handleChange}
                className="p-2 bg-slate-100 border rounded"
              />

              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={produit.brand}
                onChange={handleChange}
                className="p-2 bg-slate-100 border rounded"
              />

              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                name="category"
                value={produit.category}
                onChange={handleChange}
                className="p-2 bg-slate-100 border rounded"
              >
                <option value="">-- Sélectionnez une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.NomCategorie}>
                    {cat.NomCategorie}
                  </option>
                ))}
              </select>

              <label htmlFor="price">Prix</label>
              <input
                type="number"
                id="price"
                name="price"
                value={produit.price}
                onChange={handleChange}
                className="p-2 bg-slate-100 border rounded"
              />

              <label htmlFor="discount">Remise (%)</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={produit.discount}
                onChange={handleChange}
                className="p-2 bg-slate-100 border rounded"
              />

              <label htmlFor="quantite">Quantité</label>
              <input
                type="number"
                id="quantite"
                name="quantite"
                value={produit.quantite}
                onChange={handleChange}
                className="p-2 bg-slate-100 border rounded"
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={produit.description}
                onChange={handleChange}
                className="p-2 bg-slate-100 border rounded"
              />

              <label htmlFor="image">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-2 bg-slate-100 border rounded"
              />

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`p-2 text-white rounded-md mb-10 ${
                    isUploading
                      ? "bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-900"
                  }`}
                >
                  {isUploading ? "Téléchargement..." : "Ajouter Produit"}
                </button>
                <button
                  type="button"
                  className="bg-red-700 p-2 text-white rounded-md mb-10"
                  onClick={onClose}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterProduit;
