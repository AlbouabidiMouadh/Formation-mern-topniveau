import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/login/Login";
import AllCatgr from "../pages/categorie/AllCatgr";
import { useSelector } from "react-redux";
import AllProduits from "../pages/produit/AllProduit";
import AllUsers from "../pages/user/AllUsers";
import AllOrders from "../pages/order/AllOrders";

export const Routing = () => {
  const admin = useSelector((state) => state.admin);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/categories"
          element={
            admin.isAuthenticated ? <AllCatgr /> : <Navigate to={"/"} replace />
          }
        />
        <Route
          path="/admin/produits"
          element={
            admin.isAuthenticated ? (
              <AllProduits />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            admin.isAuthenticated ? <AllUsers /> : <Navigate to={"/"} replace />
          }
        />
        <Route
          path="/admin/orders"
          element={
            admin.isAuthenticated ? (
              <AllOrders />
            ) : (
              <Navigate to={"/"} replace />
            )
          }
        />
        <Route path="*" element={() => <div>Not found</div>} />
      </Routes>
    </Router>
  );
};
