import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { DEFAULT_PATH } from "./paths";
import LoadingScreen from "../utils/LoadingScreen";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [{ path: "login", element: <LoginPage /> }],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "home", element: <HomePage /> },
        { path: "about", element: <AboutUsPage /> },
        { path: "dashboard", element: <DashboardPage /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const LoginPage = Loadable(lazy(() => import("../component/Login")));
const HomePage = Loadable(lazy(() => import("../component/Home")));
const AboutUsPage = Loadable(lazy(() => import("../component/AboutUs")));
const DashboardPage = Loadable(
  lazy(() => import("../component/MemeDashboard"))
);
const Page404 = Loadable(lazy(() => import("../component/Page404")));
