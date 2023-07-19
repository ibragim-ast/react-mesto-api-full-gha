import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, element: Component, isLoading = true, ...props }) => {
    if (isLoading) {
        return (
            <div className="loader__page">
                <div className="loader"></div>
            </div>
        );
    }
    return loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
