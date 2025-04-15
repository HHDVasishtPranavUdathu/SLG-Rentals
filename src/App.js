import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationCRUD from "./components/notification/notiCRUD";
import Login from "./login";
import Hero from "./Hero";
import OwnerLease from "./components/Lease/OwnerLease";
import TenantLease from "./components/Lease/TenantLease";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/noti" element={<NotificationCRUD />} />
        <Route path="/lease/owner" element={<OwnerLease />} />
        <Route path="/lease/tenant" element={<TenantLease />} />
      </Routes>
    </Router>
  );
}

export default App;
