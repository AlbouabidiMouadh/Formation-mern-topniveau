import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

const EditUser = ({ user: initialUser, onUpdate, onClose }) => {
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(user);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modifier Utilisateur</h2>
          <button onClick={onClose} className="text-2xl hover:text-red-600"><CgClose /></button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input name="firstname" value={user.firstname} onChange={handleChange} placeholder="Prénom" className="p-2 border rounded" required />
          <input name="lastname" value={user.lastname} onChange={handleChange} placeholder="Nom" className="p-2 border rounded" required />
          <input name="email" value={user.email} onChange={handleChange} placeholder="Email" type="email" className="p-2 border rounded" required />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;