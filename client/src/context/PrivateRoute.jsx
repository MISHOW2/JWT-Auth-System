import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./authContext";

function PrivateRoute() {
  const { user } = useContext(AuthContext);
  
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
