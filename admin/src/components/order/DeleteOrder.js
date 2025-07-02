import React from 'react';

function DeleteOrder({ order, onDelete, onCancel }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800">Confirmer la suppression</h3>
        <p className="text-sm text-gray-600 mt-2">
          Êtes-vous sûr de vouloir supprimer la commande{" "}
          <strong>{order._id}</strong> effectuée par l'utilisateur{" "}
          <strong>{order.userId?.name || order.userId || "Inconnu"}</strong> d’un montant total de{" "}
          <strong>{order.total} €</strong> ?
        </p>
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Annuler
          </button>
          <button
            onClick={() => onDelete(order._id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrder;
