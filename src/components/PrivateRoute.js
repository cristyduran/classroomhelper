import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthenticationContext from './AuthenticationContext';

const PrivateRoute = ({ path, element, ...props }) => {
    const { isAuthenticated } = useContext(AuthenticationContext);

    return isAuthenticated ? (
        <Route path={path} {...props} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;