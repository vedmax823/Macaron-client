import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainWrapper from "../components/MainWrapper";
import MainPage from "../pages/MainPage";
import PrivateRoutes from "../components/PrivateRoutes";
import { ALLERGENS_ROUTE, INGREDIENTS_ROUTE, MACARONS_ROUTE, MAIN_ROUTE } from "./routesConsts";

import AllergenPage from "@/pages/AllergenPage";
import IngredientsPage from "@/pages/IngredientsPage";
import MacaronsPage from "@/pages/MacaronsPage/MacaronsPage";

const privateRoutes: RouteObject[] = [
    {
      path: "/",
      element: <MainWrapper />,
      children: [
        {
          path: MAIN_ROUTE,
          element: <MainPage />,
        },
        {
            path: MACARONS_ROUTE,
            element : <MacaronsPage />,
        },
        {
            path : ALLERGENS_ROUTE,
            element : <AllergenPage />
        },
        {
            path : INGREDIENTS_ROUTE,
            element : <IngredientsPage />
        },
        {
          path: "*",
          element: (
            <div className="w-full height_without_header flex justify-center items-center">
              Page Not Found
            </div>
          ),
        },
      ],
    },
  ];
  
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <PrivateRoutes />,
      children: [...privateRoutes],
    },
  
    {
      path: "/login",
      element: <LoginPage />,
    },
  ];
  
  export const router = createBrowserRouter(routes);
  