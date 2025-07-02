import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-slate-400 to-blue-950 text-white">
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
            #
          </th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
            Nom
          </th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
            Email
          </th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user._id}
            className={`$ {
              index % 2 === 0 ? "bg-white" : "bg-gray-200"
            } hover:bg-gray-100 transition-colors duration-150`}
          >
            <td className="px-6 py-4 text-gray-700">{index + 1}</td>
            <td className="px-6 py-4 text-gray-700">
              {user.firstname} {user.lastname}
            </td>
            <td className="px-6 py-4 text-gray-700">{user.email}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => onEdit(user)}
                className="text-blue-600 mr-2 hover:underline"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(user)}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
