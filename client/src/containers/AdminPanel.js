import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
function AdminPanel({ children }) {
  const admin = useSelector((state) => state.admin);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <main className="min-h-[calc(100vh-120px)] pt-16">
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        {/* Mobile Header */}
        <header className="bg-gradient-to-tr from-blue-950 to-white backdrop-blur-sm p-4 flex justify-between items-center md:hidden shadow-sm">
          <div className="flex items-center">
            <FaRegCircleUser className="text-2xl" />
            <div className="ml-3">
              <p className="capitalize text-lg font-semibold text-gray-800">
                {admin.name}
              </p>
              <p className="text-sm text-gray-600">{admin.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className='text-2xl text-indigo-600 hover:text-indigo-800 transition-colors duration-200 focus:outline-none aria-label="Toggle menu"'
          >
            {isOpenMenu ? <IoIosClose /> : <TiThMenu />}
          </button>
        </header>

        {/* Sidebar */}
        <aside
          className={`bg-gradient-to-tr from-blue-950 to-white  backdrop-blur-sm min-h-full w-full max-w-64 md:block 
                ${
                  isOpenMenu ? "block" : "hidden"
                } shadow-lg transition-all duration-300`}
        >
          <div className="flex flex-col items-center justify-center py-6 border-b border-gray-200">
            <div className="relative flex justify-center mb-4">
              <FaRegCircleUser className="text-4xl" />
            </div>
            <div className="text-center">
              <p className="capitalize text-xl font-semibold text-gray-800">
                {admin.name}
              </p>
              <p className="text-sm text-gray-600">{admin.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-3">
            <Link
              to="/admin/categories"
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200
              ${
                isActive("/admin/categories")
                  ? "bg-indigo-100 text-indigo-700 shadow-md"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <FaListAlt className="mr-3 w-5 h-5" />
              <span className="font-medium">Liste des catégories</span>
            </Link>

            <Link
              to="/admin/users"
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200
              ${
                isActive("/admin/users")
                  ? "bg-indigo-100 text-indigo-700 shadow-md"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            >
              <FaListAlt className="mr-3 w-5 h-5" />
              <span className="font-medium">Liste des utilisateurs</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50/80 backdrop-blur-sm m-4 md:m-6 rounded-xl shadow-lg">
          {children}
        </main>
      </div>
      <Footer />
    </main>
  );
}

export default AdminPanel;
