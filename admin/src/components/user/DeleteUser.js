import React from "react";

const DeleteUser = ({ user, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Supprimer l'utilisateur</h2>
        <p className="text-sm text-gray-600">Confirmez-vous la suppression de {user.firstname} {user.lastname} ?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
          <button onClick={() => onDelete(user._id)} className="bg-red-600 text-white px-4 py-2 rounded">Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;