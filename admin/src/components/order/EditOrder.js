import React, { useEffect, useState } from 'react';

function EditOrder({ order, onSave, onCancel }) {
  const [editOrder, setEditOrder] = useState(order);

  useEffect(() => {
    setEditOrder(order);
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditOrder((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(editOrder);
  };

  if (!editOrder) return null;

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-xl">
      <h3 className="text-xl font-semibold mb-4">Modifier Commande</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Statut de la commande</label>
          <select
            name="status"
            value={editOrder.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmée</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Statut du paiement</label>
          <select
            name="paymentStatus"
            value={editOrder.paymentStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="pending">En attente</option>
            <option value="paid">Payé</option>
            <option value="failed">Échoué</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Méthode de paiement</label>
          <select
            name="paymentMethod"
            value={editOrder.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="cash">Espèces</option>
            <option value="card">Carte</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Adresse de livraison</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="street"
              placeholder="Rue"
              value={editOrder.shippingAddress?.street || ''}
              onChange={handleAddressChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={editOrder.shippingAddress?.city || ''}
              onChange={handleAddressChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="state"
              placeholder="Région"
              value={editOrder.shippingAddress?.state || ''}
              onChange={handleAddressChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="zip"
              placeholder="Code postal"
              value={editOrder.shippingAddress?.zip || ''}
              onChange={handleAddressChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="country"
              placeholder="Pays"
              value={editOrder.shippingAddress?.country || ''}
              onChange={handleAddressChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
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
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
