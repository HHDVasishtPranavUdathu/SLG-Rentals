import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotiBtn from "../notification/NotiBtn";
import Banner from "../Banner"; // Import Banner
import FinalizeLease from "./FinalizeLease";
import GetLeaseById from "./GetLeaseById";
import GetLeasesByOwner from "./GetLeasesByOwner";

const OwnerLease = () => {
    const [activeTab, setActiveTab] = useState("finalize"); // Default tab set to 'finalize'
    const [bannerMessage, setBannerMessage] = useState(""); // State for banner message
    const [showBanner, setShowBanner] = useState(false); // State to show/hide the banner

    const handleShowBanner = (message) => {
        setBannerMessage(message); // Set the message to display
        setShowBanner(true); // Show the banner
    };

    const handleCloseBanner = () => {
        setShowBanner(false); // Close the banner
    };

    return (
        <div className="container">
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
                <h2>Owner Lease Management</h2>

                {showBanner && <Banner message={bannerMessage} onClose={handleCloseBanner} />} {/* Use Banner */}

                {/* Tabs for navigation */}
                <div style={{ marginBottom: "1rem" }}>
                    <button
                        onClick={() => setActiveTab("finalize")}
                        style={{
                            padding: "0.5rem 1rem",
                            margin: "0 0.5rem",
                            backgroundColor: activeTab === "finalize" ? "#007bff" : "#e0e0e0",
                            color: activeTab === "finalize" ? "white" : "#333",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Finalize Lease
                    </button>
                    <button
                        onClick={() => setActiveTab("getByOwner")}
                        style={{
                            padding: "0.5rem 1rem",
                            margin: "0 0.5rem",
                            backgroundColor: activeTab === "getByOwner" ? "#007bff" : "#e0e0e0",
                            color: activeTab === "getByOwner" ? "white" : "#333",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        My Leases
                    </button>
                </div>

                {/* Render active tab */}
                <div style={{ maxWidth: "60vw", width: "100%", border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
                    {activeTab === "finalize" && <FinalizeLease showBanner={handleShowBanner} />}
                    {activeTab === "getById" && <GetLeaseById showBanner={handleShowBanner} />}
                    {activeTab === "getByOwner" && <GetLeasesByOwner showBanner={handleShowBanner} />}
                </div>
            </div>
        </div>
    );
};

export default OwnerLease;
