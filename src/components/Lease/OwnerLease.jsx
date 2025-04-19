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

    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login after logout
    };
    return (
        <div className="container">
            <header className="header">
                <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
                <div className="header-links">
                    <Link to="/lease/owner" className="link-default">Lease</Link>
                    <Link to="/PostProperties" className="link-primary">Properties</Link>
                    <NotiBtn />
                    {/* Profile Section with Dropdown */}
                    <div className="profile-section" style={{ position: "relative", cursor: "pointer" }}>
                        <img
                            src="https://github.com/HHDVasishtPranavUdathu/SLG-Rentals/blob/main/src/components/user_12533276.png?raw=true"
                            alt="me"
                            onMouseEnter={toggleDropdown}
                            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                        />
                        {/* Dropdown Menu */}
                        {isDropdownVisible && (
                            <div
                                className="dropdown-menu"
                                style={{
                                    position: "absolute",
                                    top: "60px",
                                    right: "0",
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    zIndex: "1000",
                                    width: "150px",
                                }}
                            >
                                <Link
                                    to="/me"
                                    className="dropdown-item"
                                    style={{
                                        display: "block",
                                        padding: "10px",
                                        textDecoration: "none",
                                        color: "#333",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                    onClick={() => setIsDropdownVisible(false)} // Close dropdown after clicking
                                >
                                    My Account
                                </Link>
                                <button
                                    className="dropdown-item"
                                    onClick={handleLogout} // Handle logout
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "10px",
                                        textAlign: "left",
                                        background: "none",
                                        border: "none",
                                        color: "#333",
                                        cursor: "pointer",
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
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
