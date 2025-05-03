import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoMdNotifications, IoMdCart } from 'react-icons/io';
import { FaRegUserCircle, FaHome, FaBars } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const notificationsCount = 3; // Simulation
  const cartItemsCount = 2;   // Simulation

  const logOut = async () => {
    try {
      const fetchData = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      const response = await fetchData.json();
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => navigate('/'), 700);
      }
    } catch (error) {
      console.error('Erreur dans logOut :', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <header className="h-16 bg-gradient-to-r  from-slate-300 from-10%  to-blue-800 to-100%  text-white shadow-lg fixed w-full z-40 top-0 transition-all duration-300">
      <ToastContainer position="top-center" />
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold  tracking-tight hover:text-gray-500 transition-colors duration-200"
          >
            AdminDashboard
          </Link>
        </div>

        {/* Navigation principale */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded-md ${
                isActive ? 'bg-blue-700 text-white' : 'text-gray-200'
              } hover:bg-blue-700 hover:text-white transition-all duration-200`
            }
          >
            <FaHome className="text-lg" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/catégorie"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded-md ${
                isActive ? 'bg-blue-700 text-white' : 'text-gray-200'
              } hover:bg-blue-700 hover:text-white transition-all duration-200`
            }
          >
            Catégorie
          </NavLink>
          <NavLink
            to="/admin/pannier"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded-md ${
                isActive ? 'bg-blue-700 text-white' : 'text-gray-200'
              } hover:bg-blue-700 hover:text-white transition-all duration-200`
            }
          >
            Pannier
          </NavLink>
        </nav>

        {/* Icônes utilitaires */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative group cursor-pointer">
            <IoMdNotifications className="text-2xl text-gray-200 group-hover:text-white transform group-hover:scale-110 transition-all duration-200" />
            {notificationsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {notificationsCount}
              </span>
            )}
          </div>

          {/* Panier */}
          <div className="relative group cursor-pointer">
            <IoMdCart className="text-2xl text-gray-200 group-hover:text-white transform group-hover:scale-110 transition-all duration-200" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </div>

          {/* Menu utilisateur */}
          <div className="relative">
            <div
              className="text-3xl text-gray-200 cursor-pointer hover:text-white transform hover:scale-110 transition-all duration-200"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              <FaRegUserCircle />
            </div>
            {menuDisplay && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 transform transition-all duration-300 origin-top-right scale-95 opacity-0 animate-dropdown">
                <NavLink
                  to="/admin/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuDisplay(false)}
                >
                  Profil
                </NavLink>
                <NavLink
                  to="/admin/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuDisplay(false)}
                >
                  Paramètres
                </NavLink>
                <p
                  onClick={logOut}
                  className="cursor-pointer px-4 py-2 block text-red-500 hover:bg-red-600 hover:text-white transition-colors duration-200"
                >
                  Déconnexion
                </p>
              </div>
            )}
          </div>

          {/* Menu burger mobile */}
          <div className="md:hidden">
            <FaBars
              className="text-2xl text-gray-200 cursor-pointer hover:text-white transform hover:scale-110 transition-all duration-200"
              onClick={() => setMenuDisplay((prev) => !prev)}
            />
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuDisplay && (
        <div className="md:hidden bg-white shadow-lg py-4 transform transition-all duration-300 origin-top scale-y-0 animate-slide-down">
          <NavLink
            to="/admin/dashboard"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            onClick={() => setMenuDisplay(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            onClick={() => setMenuDisplay(false)}
          >
            Produits
          </NavLink>
          <NavLink
            to="/admin/orders"
            className="block px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            onClick={() => setMenuDisplay(false)}
          >
            Commandes
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;