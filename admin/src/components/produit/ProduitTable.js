import { endpoint } from "../../utils/config";

const ProduitTable = ({ produits, onEdit, onDelete }) => {
  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gradient-to-r from-slate-400 to-blue-950 text-white">
          <th className="px-6 py-3 text-2xl font-serif font-extrabold text-left">#</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Image</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Nom Produit</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Marque</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Catégorie</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Prix</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Remise</th>
          <th className="px-6 py-3 text-xl font-serif font-extrabold text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {produits?.map((prod, index) => (
          <tr
            key={prod._id}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-gray-200"
            } hover:bg-gray-200 transition-colors duration-150`}
          >
            <td className="px-6 py-4 text-l font-serif text-gray-700">{index + 1}</td>
            <td className="px-6 py-4">
              <img
                src={
                  prod.imageUrl
                    ? endpoint.imageReadProduit(prod.imageUrl)
                    : "/default-product.png"
                }
                alt={prod.name}
                className="w-12 h-12 rounded-full object-cover border"
              />
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{prod.name}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{prod.brand}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{prod.category}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{prod.price} €</td>
            <td className="px-6 py-4 text-sm text-gray-700">{prod.discount} %</td>
            <td className="px-6 py-4 text-sm">
              <button
                className="text-blue-600 hover:text-blue-950 hover:underline mr-4 transition-colors duration-150"
                onClick={() => onEdit(prod)}
              >
                modifier
              </button>
              <button
                className="text-red-700 hover:text-red-900 hover:underline transition-colors duration-150"
                onClick={() => onDelete(prod)}
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

export default ProduitTable;
