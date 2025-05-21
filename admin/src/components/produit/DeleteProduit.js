import React from 'react';

function DeleteProduit({ produit, onDelete, onCancel }) {
  return (
    <div className='fixed flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 inset-0'>
      <div className='bg-white p-6 shadow-lg rounded-lg w-96'>
        <h3 className='text-lg font-semibold text-gray-700'>Confirmer la suppression</h3>
        <p className='text-sm text-gray-600 mt-2'>
          Êtes-vous sûr de vouloir supprimer le produit{" "}
          <strong>{produit.productName}</strong> de la marque{" "}
          <strong>{produit.brandName}</strong> ?
        </p>
        <div className='flex justify-between mt-4'>
          <button
            onClick={onCancel}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400'
          >
            Annuler
          </button>
          <button
            onClick={() => onDelete(produit._id)}
            className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduit;
