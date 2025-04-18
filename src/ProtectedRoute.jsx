import React from "react";
import { Navigate } from "react-router-dom";

// Simulated authentication check function
const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    return token && userId ? userId : null;
};

const ProtectedRoute = ({ element, role }) => {
    const userId = isAuthenticated();

    if (!userId) {
        return <Navigate to="/login" />;
    }

    
    if (role === "owner" && !userId.startsWith("O")) {
        return <Navigate to="/" />;
    }

    if (role === "tenant" && !userId.startsWith("T")) {
        return <Navigate to="/" />;
    }

    return element; // Render the element if checks pass
};

export default ProtectedRoute;
