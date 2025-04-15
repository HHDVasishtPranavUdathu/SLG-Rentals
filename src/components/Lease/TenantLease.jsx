import React, { useState } from "react";
import CreateLease from "./CreateLease";
import NotiBtn from "../notification/NotiBtn";
import GetLeaseByTenant from "./GetLeaseByTenant";
import { Link } from "react-router-dom";

const TenantLease = () => {
    const [activeTab, setActiveTab] = useState("create"); // Default tab set to 'create'

    return (
        <div  className="container">
            <header className="header">
                    <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
                    <div className="header-links">
                        <Link to="/login" className="link-default">Login</Link>
                        <Link to="/register" className="link-default">Register</Link>
                        <Link to="/properties" className="link-primary">See Properties ↓</Link>
                        <NotiBtn />
                    </div>
                </header>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
                <h2>Tenant Lease Management</h2>
                {/* Tabs for navigation */}
                <div style={{ marginBottom: "1rem" }}>
                    <button
                        onClick={() => setActiveTab("create")}
                        style={{
                            padding: "0.5rem 1rem",
                            margin: "0 0.5rem",
                            backgroundColor: activeTab === "create" ? "#007bff" : "#e0e0e0",
                            color: activeTab === "create" ? "white" : "#333",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Create Lease
                    </button>
                    <button
                        onClick={() => setActiveTab("getByTenant")}
                        style={{
                            padding: "0.5rem 1rem",
                            margin: "0 0.5rem",
                            backgroundColor: activeTab === "getByTenant" ? "#007bff" : "#e0e0e0",
                            color: activeTab === "getByTenant" ? "white" : "#333",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        My Leases
                    </button>
                </div>
                {/* Render active tab */}
                <div style={{ maxWidth: "600px", width: "100%", border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
                    {activeTab === "create" && <CreateLease />}
                    {activeTab === "getByTenant" && <GetLeaseByTenant />}
                </div>
            </div>
        </div>
    );
};

export default TenantLease;
