import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/login/Login";
import AllCatgr from "../pages/categorie/AllCatgr";
import { useSelector } from "react-redux";

export const Routing = () => {
  const admin = useSelector((state) => state.admin);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/categorie"
          element={
            admin.isAuthenticated ? <AllCatgr /> : <Navigate to={"/"} replace />
          }
        />
        <Route path="*" element={() => <div>Not found</div>} />
      </Routes>
    </Router>
  );
};
