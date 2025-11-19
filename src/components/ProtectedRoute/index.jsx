import { Navigate } from "react-router";

const ProtectedRoute = ({ isAuth, Component }) => {
  return isAuth ? <Component /> : <Navigate to="/admin" />;
};

export default ProtectedRoute;