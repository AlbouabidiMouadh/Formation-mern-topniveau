import React, { useEffect, useState } from "react";

function EditProduit({ produit, onSave, onCancel, categories }) {
  const [editProduit, setEditProduit] = useState({
    name: "",
    brand: "",
    category: "",
    imageUrl: "",
    price: 0,
    description: "",
    discount: 0,
    quantite: 0,
  });

  useEffect(() => {
    setEditProduit(produit);
  }, [produit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduit((prev) => ({
      ...prev,
      [name]: name === "price" || name === "discount" || name === "quantite"
        ? Number(value)
        : value,
    }));
  };

  const handleSave = () => {
    onSave(editProduit);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Modifier Produit</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom Produit</label>
          <input
            type="text"
            name="name"
            value={editProduit.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Marque</label>
          <input
            type="text"
            name="brand"
            value={editProduit.brand}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Catégorie</label>
          <select
            name="category"
            value={editProduit.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">-- Sélectionnez une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.NomCategorie}>
                {cat.NomCategorie}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Prix</label>
          <input
            type="number"
            name="price"
            value={editProduit.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Remise (%)</label>
          <input
            type="number"
            name="discount"
            value={editProduit.discount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Quantité</label>
          <input
            type="number"
            name="quantite"
            value={editProduit.quantite}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={editProduit.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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
