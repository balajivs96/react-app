/*import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import Profile from "../pages/Profile";
import App from "../App";
import { Register } from "../pages/Register";

export const AppRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};*/

import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { AuthGuard } from "../authGuard/authGuard";

const App = lazy(() => import("../App"));
const Login = lazy(() =>
  import("../pages/Login").then((module) => ({ default: module.Login }))
);

const Register = lazy(() =>
  import("../pages/Register").then((module) => ({ default: module.Register }))
);

const NotFound = lazy(() =>
  import("../pages/NotFound").then((module) => ({ default: module.NotFound }))
);

const Dashboard = lazy(() =>
  import("../pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const Profile = lazy(() => import("../pages/Profile"));

// eslint-disable-next-line no-unused-vars
const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);


const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(App),
    children: [
      { path: "login", element: withSuspense(Login) },
      { path: "register", element: withSuspense(Register) },
      {
        element: <AuthGuard />, // now renders <Outlet />
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: withSuspense(Profile) },
          { path: "dashboard", element: withSuspense(Dashboard) },
          // add more protected routes here
        ],
      },
      { path: "*", element: withSuspense(NotFound) },
    ],
  },
]);

export const AppRouters = () => <RouterProvider router={router} />;
