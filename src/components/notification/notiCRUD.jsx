import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostNotification from "./notificationPost";
import GetNotifications from "./notificationRead";
import NotiBtn from "./NotiBtn";

const NotificationCRUD = () => {
    const [activeTab, setActiveTab] = useState("read");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
    const [userRole, setUserRole] = useState(""); // State to determine user role (Tenant or Owner)
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        // Determine user role based on user_id prefix
        if (userId?.startsWith("T")) {
            setUserRole("Tenant");
        } else if (userId?.startsWith("O")) {
            setUserRole("Owner");
        } else {
            setUserRole("Unknown");
        }
    }, []);

    const handleLeaseNavigation = () => {
        if (userRole === "Tenant") {
            navigate("/lease/tenant"); // Navigate to tenant lease page
        } else if (userRole === "Owner") {
            navigate("/lease/owner"); // Navigate to owner lease page
        }
    };

    const handlePropertiesNavigation = () => {
        if (userRole === "Tenant") {
            navigate("/GetProperties"); // Navigate to tenant properties page
        } else if (userRole === "Owner") {
            navigate("/PostProperties"); // Navigate to owner post properties page
        }
    };

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
                <a
                        onClick={handleLeaseNavigation}
                        className="link-default"
                        style={{
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            color: "#007bff",
                        }}
                    >
                        Lease
                    </a>
                    <a
                        onClick={handlePropertiesNavigation}
                        className="link-default"
                        style={{
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            color: "#007bff",
                        }}
                    >
                        Properties
                    </a>
                    <NotiBtn />
                    {/* Profile Section with Dropdown */}
                    <div className="profile-section" style={{ position: "relative", cursor: "pointer" }}>
                        <img
                            src="https://github.com/HHDVasishtPranavUdathu/SLG-Rentals/blob/main/src/components/user_12533276.png?raw=true"
                            alt="me"
                            onClick={toggleDropdown}
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

            <h1>Notifications</h1>
            <div className="tabs">
                <button
                    className={activeTab === "read" ? "active-tab" : ""}
                    onClick={() => setActiveTab("read")}
                >
                    Get Notifications
                </button>
                <button
                    className={activeTab === "post" ? "active-tab" : ""}
                    onClick={() => setActiveTab("post")}
                >
                    Post Notification
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === "read" && <GetNotifications />}
                {activeTab === "post" && <PostNotification />}
            </div>

            {/* Optional CSS styling for tabs */}
            <style jsx>{`
                .tabs {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                }
                button {
                    padding: 10px 20px;
                    cursor: pointer;
                    border: none;
                    background:rgba(0, 123, 255, 0.49);
                    border-radius: 5px;
                }
                .active-tab {
                    background: #007bff;
                    color: white;
                }
                .tab-content {
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default NotificationCRUD;
