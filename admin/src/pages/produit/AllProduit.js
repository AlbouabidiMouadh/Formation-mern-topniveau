import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "../../containers/AdminPanel";
import { endpoint } from "../../utils/config";
import AjouterProduit from "../../components/produit/AjouterProduit";
import ProduitTable from "../../components/produit/ProduitTable";
import DeleteProduit from "../../components/produit/DeleteProduit";
import EditProduit from "../../components/produit/EditProduit";

function AllProduits() {
  const [produit, setProduit] = useState([]);
  const [ajouterProduit, setAjouterProduit] = useState(false);
  const [viewDelete, setViewDelete] = useState(false);
  const [produitDeleted, setProduitDeleted] = useState(null);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const getAllCatgr = async () => {
    try {
      const response = await axios.get(endpoint.getAllCategorie, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 201) {
        setCategories(response.data.data || []);
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

  // Récupérer tous les produits
  const getAllProduit = async () => {
    try {
      const response = await axios.get(endpoint.getAllProduit, {
        withCredentials: true,
      });
      console.log(response.data.data);
      setProduit(response.data.data);
    } catch (error) {
      console.error("Erreur dans getAllProduit:", error);
      toast.error("Erreur lors de la récupération des produits");
    }
  };

  useEffect(() => {
    getAllCatgr();
    getAllProduit();
  }, []);

  // Gérer la suppression
  const handleDeleted = (produit) => {
    setProduitDeleted(produit);
    setViewDelete(true);
  };

  const handleCancelDeleted = () => {
    setViewDelete(false);
  };

  const onDeleteProduit = async (produitId) => {
    try {
      const response = await axios.delete(endpoint.produitById(produitId), {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data?.msg || "Produit supprimé avec succès");
      getAllProduit(); // Refresh the product list
      setViewDelete(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  };

  // Gérer l'édition
  const handleEditProduit = (produit) => {
    setSelectedProduit(produit);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdateProduit = async (updatedProduit) => {
    try {
      const response = await axios.put(
        endpoint.produitById(updatedProduit._id),
        updatedProduit,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data?.msg || "Produit mis à jour avec succès");
      getAllProduit(); // Refresh the product list
      setIsEditing(false); // Close the edit modal
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    }
  };

  return (
    <AdminPanel>
      <div className="min-h-screen flex items-start justify-center py-10">
        <div className="w-full rounded-lg shadow-gray-500 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-tr from-gray-4000 to-slate-400 py-2 px-4 flex justify-between items-center">
            <h2 className="text-3xl text-blue-950 font-extrabold text-center py-4 font-serif">
              Liste des Produits
            </h2>
            <button
              className="px-3 py-1 border-2 border-blue-950 text-blue-400 rounded-lg transition-colors duration-200 hover:bg-slate-600 hover:text-white"
              onClick={() => setAjouterProduit(true)}
            >
              Ajouter Nouveau Produit
            </button>
          </div>
          <div className="md:block">
            <ProduitTable
              produits={produit}
              onDelete={handleDeleted}
              onEdit={handleEditProduit}
            />
          </div>
        </div>

        {ajouterProduit && (
          <AjouterProduit
            fetchdata={getAllProduit}
            onClose={() => setAjouterProduit(false)}
            categories={categories}
          />
        )}

        {viewDelete && (
          <DeleteProduit
            produit={produitDeleted}
            onCancel={handleCancelDeleted}
            onDelete={onDeleteProduit}
          />
        )}

        {isEditing && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <EditProduit
              categories={categories}
              produit={selectedProduit}
              onSave={handleUpdateProduit}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </AdminPanel>
  );
}

export default AllProduits;
