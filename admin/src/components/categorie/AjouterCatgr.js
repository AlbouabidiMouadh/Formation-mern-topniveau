import React, { useState } from "react";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../../utils/config";

function AjouterCatgr({ onClose, fetchdata }) {
  const [categorie, Setcatgr] = useState({
    NomCategorie: "",
    type: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    Setcatgr((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis");

    try {
      const reponse = await axios.post(endpoint.addCategorie, categorie, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("reponse", reponse);

      if (reponse.status === 201) {
        toast.success(reponse.data?.msg || "Catégorie ajoutée avec succès");
        onClose();
        fetchdata();
        Setcatgr({ NomCategorie: "", type: "" });
        navigate("/admin/categories");
      } else {
        toast.error(reponse.data?.msg || "Erreur lors de l’ajout");
      }
    } catch (error) {
      console.error("Erreur réseau ou autre:", error);
      toast.error("Erreur inattendue, veuillez réessayer");
    }
  };

  return (
    <div className="fixed min-h-screen flex flex-col justify-center md:absolute sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative font-serif px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Ajouter Catégorie</h1>
              <div
                className="w-fit ml-auto text-2xl hover:text-red-500 cursor-pointer"
                onClick={onClose}
              >
                <CgClose />
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form
                  onSubmit={handleSubmit}
                  className="grid gap-2 p-4 h-full pb-2"
                >
                  <label htmlFor="CatgrName">Nom Catégorie</label>
                  <input
                    type="text"
                    id="CatgrName"
                    name="NomCategorie"
                    value={categorie?.NomCategorie}
                    placeholder="NomCategorie"
                    onChange={handleChange}
                    className="p-2 bg-slate-100 border rounded"
                  />
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={categorie?.type}
                    placeholder="type"
                    onChange={handleChange}
                    required
                    className="p-2 bg-slate-100 border rounded"
                  />
                  <div className="relative space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-500 p-1 text-justify text-white rounded-md mb-10 hover:bg-blue-950"
                    >
                      Ajouter Categorie
                    </button>
                    <button
                      type="button"
                      className="bg-red-700 p-1 text-justify text-white rounded-md mb-10"
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

export default AjouterCatgr;
