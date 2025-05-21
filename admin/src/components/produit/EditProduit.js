import React, { useEffect, useState } from 'react';

function EditProduit({ produit, onSave, onCancel }) {
  const [editProduit, setEditProduit] = useState(produit);

  useEffect(() => {
    setEditProduit(produit);
  }, [produit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editProduit);
  };

  return (
    <div className='bg-white p-6 shadow-lg rounded-lg'>
      <h3 className='text-xl font-semibold mb-4'>Modifier Produit</h3>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Nom Produit</label>
          <input
            type='text'
            name='productName'
            value={editProduit?.productName}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Marque</label>
          <input
            type='text'
            name='brandName'
            value={editProduit?.brandName}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Catégorie</label>
          <input
            type='text'
            name='category'
            value={editProduit?.category}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Prix</label>
          <input
            type='number'
            name='price'
            value={editProduit?.price}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Prix de Vente</label>
          <input
            type='number'
            name='sellingPrice'
            value={editProduit?.sellingPrice}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
        </div>
        <div className='flex justify-end space-x-4 mt-4'>
          <button
            className='bg-gray-500 text-white px-4 py-2 rounded-lg'
            onClick={onCancel}
          >
            Annuler
          </button>
          <button
            className='bg-blue-600 text-white px-4 py-2 rounded-lg'
            onClick={handleSave}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduit;
