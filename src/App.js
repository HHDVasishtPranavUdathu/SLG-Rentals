import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationCRUD from "./components/notification/notiCRUD";
import Login from "./components/Login_Register/login";
import Hero from "./Hero";
import OwnerLease from "./components/Lease/OwnerLease";
import TenantLease from "./components/Lease/TenantLease";
import RegistrationForm from "./components/Login_Register/Registration";
import PasswordReset from "./components/Login_Register/ResetPassword";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<RegistrationForm />} />
        <Route path="/ResetPassword" element={<PasswordReset />} />
        
        {/* Protected routes with role-based checks */}
        <Route path="/noti" element={<ProtectedRoute element={<NotificationCRUD />} />} />
        <Route path="/lease/owner" element={<ProtectedRoute element={<OwnerLease />} role="owner" />} />
        <Route path="/lease/tenant" element={<ProtectedRoute element={<TenantLease />} role="tenant" />} />
      </Routes>
    </Router>
  );
}

export default App;
