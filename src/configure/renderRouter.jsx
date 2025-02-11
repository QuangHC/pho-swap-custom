import {useRoutes} from "react-router-dom";
import NotFound from "~/pages/NotFound/index.jsx";
import {privateRoutes, publicRoutes} from "~/configure/appRoutes.jsx";
import ProtectedRoute from "~/components/Routes/ProtectedRoute.jsx";

const withLayout = (Component, Layout) => {
    return Layout ? <Layout><Component/></Layout> : <Component/>;
};

const routes = [
    ...privateRoutes.map(({path, component: Component, layout}) => ({
        path,
        element:
            <ProtectedRoute>
                {withLayout(Component, layout)}
            </ProtectedRoute>
    })),
    ...publicRoutes.map(({path, component: Component, layout}) => ({
        path,
        element: withLayout(Component, layout),
    })),
    {
        path: "*",
        element: <NotFound/>,
    },
];

const RenderRouter = () => useRoutes(routes);

export default RenderRouter;
