import { RouterProvider, createBrowserRouter } from "react-router-dom";

import loadable from "@loadable/component";
import LoadingBar from "../components/LoadingBar";

import { nonProtectedRoutes } from "./nonProtectedRoutes";
import { protectedRoutes } from "./protectedRoutes";
import Authenticated from "./Authenticated";
import Navbar from "../components/Navbar";

const NotFound = loadable(() => import("../pages/NotFoundPage"), {
  fallback: <LoadingBar />,
});

export const router = createBrowserRouter([
  ...nonProtectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: <Component />,
  })),
  ...protectedRoutes.map(({ path, component: Component }) => ({
    path,
    element: (
      <Authenticated>
        <Component />
      </Authenticated>
    ),
  })),
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppNavigation = () => (
  <div>
    <Navbar />
    <RouterProvider router={router} />
  </div>
);

export default AppNavigation;
