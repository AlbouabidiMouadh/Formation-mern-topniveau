import React from 'react'

function DeleteCatgr ({categorie,onDelete,onCancel}) {
  return (
    <div className='fixed flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
        <div className='bg-white p-6 shadow-lg rounded-lg w-96'>
            <h3 className=' text-lg font-semibold text-gray-700'>confirmer la supression</h3>
            <p className=' text-sm text-gray-600 mt-2'>Etes vous sur de supprimer la categorie {categorie.NomCategorie} {" "} {categorie.type}?</p>
          <div className='flex justify-between mt-4'>
        <button onClick={onCancel} className='bg-gray-300 text-white px-4 py-2 rounded-lg'>
            Annuler
        </button>
        <button onClick={() => onDelete(categorie._id)}
        className='bg-red-600 text-white px-4 py-2 rounded-lg'>
            Supprimer
        </button>
         </div>
       </div>
    </div>
  )
}

export default DeleteCatgr