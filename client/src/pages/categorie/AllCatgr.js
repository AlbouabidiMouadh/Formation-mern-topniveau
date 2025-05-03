import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AjouterCatgr from "../../components/categorie/AjouterCatgr";
import DeleteCatgr from "../../components/categorie/DeleteCatgr";
import EditCatgr from "../../components/categorie/EditCatgr";
import CatgrTable from "../../components/categorie/CatgrTable";
import AdminPanel from "../../containers/AdminPanel";

function AllCatgr() {
  const [categorie, setCategorie] = useState([]);
  const [ajouterCategorie, setAjouterCatgr] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);
  const [categorieDeleted, setCategorieDeleted] = useState(null);
  const [selectedCatgr, setSelectedCatgr] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Récupérer toutes les catégories
  const getAllCatgr = async () => {
    try {
      const fetchData = await fetch(
        `${process.env.REACT_APP_API_URL}/categories`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const response = await fetchData.json();
      if (fetchData.ok) {
        setCategorie(response.data?.result || response.data);
      } else {
        throw new Error(
          response.message || "Erreur lors de la récupération des catégories"
        );
      }
    } catch (error) {
      console.error("Erreur dans getAllCatgr :", error);
      toast.error("Erreur lors de la récupération des catégories");
    }
  };

  useEffect(() => {
    getAllCatgr();
  }, []);

  // Gérer la suppression
  const handleDeleted = (categorie) => {
    setCategorieDeleted(categorie);
    setViewDelete(true);
  };

  const handleCancelDeleted = () => {
    setViewDelete(false);
  };

  const onDeleteCategorie = async (categorieId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/categorie/` + categorieId,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data?.msg || "Catégorie supprimée avec succès");
      getAllCatgr();
      setViewDelete(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  };

  // Gérer l'édition
  const handleEditCatgr = (categorie) => {
    setSelectedCatgr(categorie);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdateCatgr = async (updatedCatgr) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/modifiercatg/${updatedCatgr._id}`,
        {
          NomCategorie: updatedCatgr.NomCategorie,
          type: updatedCatgr.type,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data?.msg || "Catégorie mise à jour avec succès");
      getAllCatgr();
      setIsEditing(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    }
  };

  return (
    <AdminPanel>
      <div className="min-h-screen flex items-center justify-center py-10">
        <div className="w-full max-w-3xl rounded-lg shadow-gray-500 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-tr from-gray-4000 to-slate-400 py-2 px-4 flex justify-between items-center">
            <h2 className="text-3xl text-blue-950 font-extrabold text-center py-4 font-serif">
              Liste des Catégories
            </h2>
            <button
              className="px-3 py-1 border-2 border-blue-950 text-blue-400 rounded-lg transition-colors duration-200 hover:bg-slate-600 hover:text-white"
              onClick={() => setAjouterCatgr(true)}
            >
              Ajouter Nouvelle Catégorie
            </button>
          </div>
          <div className="md:block">
            <CatgrTable
              categorie={categorie}
              onDelete={handleDeleted}
              onEdit={handleEditCatgr}
            />
          </div>
        </div>

        {ajouterCategorie && (
          <AjouterCatgr
            fetchdata={getAllCatgr}
            onClose={() => setAjouterCatgr(false)}
          />
        )}
        {viewDelete && (
          <DeleteCatgr
            categorie={categorieDeleted}
            onCancel={handleCancelDeleted}
            onDelete={onDeleteCategorie}
          />
        )}
        {isEditing && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <EditCatgr
              categorie={selectedCatgr}
              onSave={handleUpdateCatgr}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </AdminPanel>
  );
}

export default AllCatgr;
