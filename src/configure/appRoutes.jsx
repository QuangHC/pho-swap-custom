import routesConfigure from "~/configure/routesConfig.jsx";
import {AddLiquidity, CreatePool, Home} from "../pages/index.jsx";
import DefaultLayout from "~/layout/DefaultLayout.jsx";

export const publicRoutes = [
    {path: routesConfigure.Home, component: Home, layout: DefaultLayout},
    {path: routesConfigure.CreatePool, component: CreatePool, layout: null},
    {path: routesConfigure.AddLiquidity, component: AddLiquidity, layout: null},
];

export const privateRoutes = [
    {path: routesConfigure.CreatePool, component: CreatePool, layout: null},
];
