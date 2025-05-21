import React, { useState } from "react";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { endpoint } from "../../utils/config";
import axios from "axios";

function AjouterProduit({ onClose, fetchdata }) {
  const [produit, setProduit] = useState({
    productName: "",
    brandName: "",
    category: "",
    price: "",
    sellingPrice: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, brandName, category, price, sellingPrice } = produit;

    if (!productName || !brandName || !category || !price || !sellingPrice) {
      toast.error("Tous les champs sont requis");
      return;
    }

    try {
      const response = await axios.post(endpoint.ajouterProduit, produit, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data?.msg || "Produit ajouté avec succès");
      onClose();
      fetchdata();
      setProduit({
        productName: "",
        brandName: "",
        category: "",
        price: "",
        sellingPrice: "",
        description: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      toast.error(
        error.response?.data?.message || "Erreur inattendue, veuillez réessayer"
      );
    }
  };

  return (
    <div className="fixed min-h-screen flex flex-col justify-center md:absolute sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative font-serif px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Ajouter Produit</h1>
              <div
                className="w-fit ml-auto text-2xl hover:text-red-500 cursor-pointer"
                onClick={onClose}
              >
                <CgClose />
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit} className="grid gap-2 p-4 h-full pb-2">
                  <label htmlFor="productName">Nom du Produit</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={produit.productName}
                    onChange={handleChange}
                    className="p-2 bg-slate-100 border rounded"
                  />

                  <label htmlFor="brandName">Marque</label>
                  <input
                    type="text"
                    id="brandName"
                    name="brandName"
                    value={produit.brandName}
                    onChange={handleChange}
                    className="p-2 bg-slate-100 border rounded"
                  />

                  <label htmlFor="category">Catégorie</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={produit.category}
                    onChange={handleChange}
                    className="p-2 bg-slate-100 border rounded"
                  />

                  <label htmlFor="price">Prix</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={produit.price}
                    onChange={handleChange}
                    className="p-2 bg-slate-100 border rounded"
                  />

                  <label htmlFor="sellingPrice">Prix de Vente</label>
                  <input
                    type="number"
                    id="sellingPrice"
                    name="sellingPrice"
                    value={produit.sellingPrice}
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

                  <div className="relative space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-500 p-1 text-white rounded-md mb-10 hover:bg-blue-950"
                    >
                      Ajouter Produit
                    </button>
                    <button
                      type="button"
                      className="bg-red-700 p-1 text-white rounded-md mb-10"
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
      </div>
    </div>
  );
}

export default AjouterProduit;
