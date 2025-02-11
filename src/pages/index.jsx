import { lazy } from "react";

const Home = lazy(() => import("~/pages/Home/index.jsx"));
const CreatePool = lazy(() => import("~/pages/CreatePool/index.jsx"));
const AddLiquidity = lazy(() => import("~/pages/AddLiquidity/index.jsx"));

export {
    Home,
    CreatePool,
    AddLiquidity
};
