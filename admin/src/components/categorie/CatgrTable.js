const CatgrTable = ({ categorie, onEdit, onDelete }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-slate-400 to-blue-950 text-white">
          <th className="px-6 py-3 text-2xl font-serif font-extrabold text-left">
            #
          </th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
            Nom Categorie
          </th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
            Type
          </th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {categorie?.map((cat, index) => (
          <tr
            key={cat._id}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-gray-200"
            } hover:bg-gray-200 transition-colors duration-150`}
          >
            <td className="px-6 py-4 text-l font-serif text-gray-700">
              {index + 1}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">
              {cat.NomCategorie}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{cat.type}</td>
            <td className="px-6 py-4 text-sm">
              <button
                className="text-blue-600 hover:text-blue-950 hover:underline mr-4 transition-colors duration-150"
                onClick={() => onEdit(cat)}
              >
                modifier
              </button>
              <button
                className="text-red-700 hover:text-red-900 hover:underline transition-colors duration-150"
                onClick={() => onDelete(cat)}
              >
                supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CatgrTable;
