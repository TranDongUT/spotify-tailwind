import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ children }: any) {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/Home" />;
}

export default PrivateRoute;
