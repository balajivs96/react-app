import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

export const AuthGuard = () => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = !!sessionStorage.getItem("token");
  const location = useLocation();

  if (!user.isLogged || !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
