import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // or from context

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;