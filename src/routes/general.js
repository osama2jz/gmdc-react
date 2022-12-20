import { lazy } from "react";
import { Navigate } from "react-router-dom";
// components
import Loadable from "../components/Loadable";
import GeneralLayout from "../layouts/GeneralLayout";
import AboutUs from "../pages/AboutUs";
import ApplyOnline from "../pages/ApplyOnline";
import Inventory from "../pages/Inventory";
import ViewCar from "../pages/ViewCar";
// routes
import routeNames from "./routeNames";
// pages
const Landing = Loadable(lazy(() => import("../pages/Landing")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const general = {
  path: "/",
  element: <GeneralLayout />,
  children: [
    { path: routeNames.general.landing, element: <Landing /> },
    { path: routeNames.general.inventory, element: <Inventory /> },
    { path: routeNames.general.inventory2, element: <Inventory /> },
    { path: routeNames.general.viewCar, element: <ViewCar /> },
    { path: routeNames.general.apply, element: <ApplyOnline /> },
    { path: routeNames.general.aboutUs, element: <AboutUs /> },
    { path: routeNames.general.notFound, element: <Page404 /> },
    { path: "/", element: <Navigate to={routeNames.general.landing} /> },
    { path: "*", element: <Navigate to={routeNames.general.landing} /> },
  ],
};

export default general;
