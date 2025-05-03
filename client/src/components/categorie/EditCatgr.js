import React, { useEffect, useState } from 'react'

function EditCatgr ({categorie, onSave,onCancel}) {
    const [editCatgorie, SetEditCatgr]=useState(categorie)

    useEffect(()=>{
        SetEditCatgr(categorie)
    },[categorie])

    const handlechange=(e)=>{
        const {name,value}=e.target;
        SetEditCatgr((preve)=>({
            ...preve,
            [name]:value,
        }));
    };

    const handlesave=()=>{
        onSave(editCatgorie)
    }
  return (
    <div className=' bg-white p-6 shadow-lg rounded-lg'>
        <h3 className=' text-xl font-semibold mb-4'>modifier Catégorie</h3>
        <div className=' space-y-4'>
            <div>
                <label className=' block text-sm font-medium'>Nom Categorie</label>
                <input
                type='text'
                name='NomCategorie'
                value={editCatgorie?.NomCategorie} 
                onChange={handlechange}
                className=' w-full p-2 horder border-gray-300 rounded-lg'               
                />
            </div>
            <div>
                <label className=' block text-sm font-medium'>Type</label>
                <input
                type='text'
                name='type'
                value={editCatgorie?.type} 
                onChange={handlechange}
                className=' w-full p-2 horder border-gray-300 rounded-lg'               
                />
            </div>
            <div className=' flex justify-end space-x-4 mt-4'>
                <button
                className=' bg-gray-500 text-white px-4 py-2 rounded-lg'
                onClick={onCancel}
                >
                    Annuler
                </button>
                <button
                className=' bg-blue-600 text-white px-4 py-2 rounded-lg'
                onClick={handlesave}
                >
                    Modifier
                </button>

            </div>

        </div>
        </div>
  )
}

export default EditCatgr