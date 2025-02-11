// src/components/routes/ProtectedRoute.js
import {Navigate, useLocation} from 'react-router-dom';
import routesConfigure from "~/configure/routesConfig.jsx";
import useAuthStore from "~/store/authStore.js";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation();
    return isAuthenticated ? children : <Navigate to={routesConfigure.Login} state={{ from: location.pathname }} replace={true} />;
};

export default ProtectedRoute;
