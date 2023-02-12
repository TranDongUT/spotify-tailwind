import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/Home"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const User = lazy(() => import("../pages/User"));
const Setting = lazy(() => import("../pages/Setting"));

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/User",
        element: <User />,
      },
      {
        path: "/Setting",
        element: <Setting />,
      },
    ],
  },

  {
    path: "*",
    element: <div>404</div>,
  },
];

export { routes };
