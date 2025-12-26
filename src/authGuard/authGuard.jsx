import { Navigate, Outlet, useLocation } from "react-router";

export const AuthGuard = () => {
  const isAuthenticated = !!sessionStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
