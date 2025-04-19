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
import MyProfile from "./components/MyProfile";
import Hero2 from "./Hero2";
import GetProperties from "./components/properties/GetProperty";
import PostProperty from "./components/properties/PostProperty";
import AllProperties from "./components/properties/AllProperties";
import HeroT from "./HeroT";
import AddMaintain from "./components/maintain/AddMaintain";
import TenantReqMaintaince from "./components/maintain/TenantReqMaintaince";
import OwnerReq from "./components/maintain/OwnerReq";
import AllOwnerReq from "./components/maintain/AllOwnerReq";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<RegistrationForm />} />
        <Route path="/ResetPassword" element={<PasswordReset />} />
        <Route path="/AllProperties" element={<AllProperties/>} />

        

        <Route path="/me" element={<ProtectedRoute element={<MyProfile/>} />} />
        <Route path="/noti" element={<ProtectedRoute element={<NotificationCRUD />} />} />
        <Route path="/lease/owner" element={<ProtectedRoute element={<OwnerLease />} role="owner" />} />
        <Route path="/PostProperties" element={<ProtectedRoute element={<PostProperty />} role="owner" />} />
        <Route path="/OwnerReq" element={<ProtectedRoute element={<OwnerReq/>} role="owner" />} />
        <Route path="/AllOwnerReq" element={<ProtectedRoute element={<AllOwnerReq/>} role="owner" />} />
        <Route path="/o" element={<ProtectedRoute element={<Hero2 />} role="owner" />} />
        <Route path="/lease/tenant" element={<ProtectedRoute element={<TenantLease />} role="tenant" />} />
        <Route path="/t" element={<ProtectedRoute element={<HeroT/>} role="tenant" />} />
        <Route path="/GetProperties" element={<ProtectedRoute element={<GetProperties />} role="tenant" />} />
        <Route path="/addmaintain" element={<ProtectedRoute element={<AddMaintain />} role="tenant" />} />
        <Route path="/maintainreq" element={<ProtectedRoute element={<TenantReqMaintaince/>} role="tenant" />} />
      </Routes>
    </Router>
  );
}

export default App;
