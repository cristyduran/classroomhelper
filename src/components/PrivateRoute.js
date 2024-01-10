import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';

const PrivateRoute = ({ path, element, ...props }) => {
    const { isAuthenticated } = useContext(AuthenticationContext);
    console.log('IsAuthenticated:', isAuthenticated);

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;