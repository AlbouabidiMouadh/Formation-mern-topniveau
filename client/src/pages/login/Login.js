import React, { useState } from "react";
import ImageLogo from "../../assets/images.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/slices/adminSlice";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await dataResponse.json();

    if (response.success) {
      const adminData = response.data.admin;
      dispatch(
        loginAdmin({
          id: adminData.id,
          name: adminData.name,
          email: adminData.email,
          role: adminData.role,
          token: response.data.token,
        })
      );
      toast.success(response.message);
      setTimeout(() => navigate("/admin/categorie"), 700);
    } else {
      toast.error(response.message);
    }
  };

  return (
      <div className=" min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-400 to-blue-950 p-6">
        <ToastContainer position="top-center" />
        <div className="  bg-gray-200 p-8 rounded-3xl w-full max-w-md hover:shadow-2xl">
          {/* Logo */}
          <div className="w-32 h-32 mx-auto mb-6">
            <img
              src={ImageLogo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Formulaire */}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            {/* Champ Email */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Email</label>
              <div className="relative hover:scale-105">
                <input
                  type="email"
                  name="email"
                  placeholder="Entrez votre email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 font-medium">Mot de passe</label>
              <div className="relative flex items-center hover:scale-105">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
                <div
                  className="absolute right-3 text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" />
              <span className="text-sm">Remember Password</span>
            </div>

            {/* Bouton Login */}
            <button
              type="submit"
              className="bg-gradient-to-tr from-slate-300 to-blue-900 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full mt-4 mx-auto w-full max-w-[200px] transform transition-all duration-300 hover:scale-105"
            >
              Se connecter
            </button>
          </form>
          <p className="font-semibold mt-5">
            Don't have an account?
            <a href="#" className="text-blue-900 hover:underline">
              {" "}
              Register{" "}
            </a>
          </p>
          {/* Lien optionnel (exemple) */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            Mot de passe oublié ?{" "}
            <p className="text-blue-500 hover:underline">Réinitialiser</p>
          </p>
        </div>
      </div>
    
  );
}

export default Login;
