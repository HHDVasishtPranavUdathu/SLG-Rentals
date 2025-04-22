import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotiBtn from "./notification/NotiBtn";
import axios from "axios";
 
const MyProfile = () => {
    const [profile, setProfile] = useState(null); // State to hold profile data
    const [error, setError] = useState(null); // State to handle errors
 
    // Fetch the userId from localStorage
    const userId = localStorage.getItem("user_id"); // Make sure this key matches your app's setup
    const API_URL = `https://localhost:7150/api/Registrations/${userId}`;
 
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
 
    const handlePayNavigation = () => {
        if (userRole === "Tenant") {
            navigate("/postpayment"); // Navigate to tenant properties page
        } else if (userRole === "Owner") {
            navigate("/getpayowner"); // Navigate to owner post properties page
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
 
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from localStorage
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token for authentication
                        "Content-Type": "application/json",
                    },
                });
                setProfile(response.data); // Save the profile data to state
            } catch (err) {
                setError(err.message || "An error occurred while fetching the profile.");
            }
        };
 
        fetchProfile();
    }, [API_URL]);
 
    if (error) {
        return <p>Error: {error}</p>; // Render the error if any
    }
 
    if (!profile) {
        return <p>Loading...</p>; // Render a loading message until the data is fetched
    }
 
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
                        onClick={handlePayNavigation}
                        className="link-default"
                        style={{
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            color: "#007bff",
                        }}
                    >
                        Payment
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
            <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
                <h2>My Profile</h2>
                <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px" }}>
                    <p><strong>ID:</strong> {profile.id}</p>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                    <p><strong>Date of Birth:</strong> {profile.d_O_B}</p>
                    <p><strong>Role:</strong> {profile.roleofUser}</p>
                    <p><strong>Signature:</strong> {profile.signature}<br />(*do not share this)</p>
                </div>
                {/* Conditional Buttons Based on User Role */}
                <div style={{ marginTop: "20px" }}>
                    {userRole === "Tenant" ? (
                        <div>
                            Maintainance:
                            <button
                                onClick={() => navigate("/addmaintain")}
                                style={{
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    margin: "10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Post request
                            </button>
                            <button
                                onClick={() => navigate("/maintainreq")}
                                style={{
                                    backgroundColor: "#007BFF",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    margin: "10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Maintenance Request
                            </button>
                        </div>
                    ) : userRole === "Owner" ? (
                        <div>
                            Maintainance:
                            <button
                                onClick={() => navigate("/OwnerReq")}
                                style={{
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    margin: "10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                See Request
                            </button>
                           
                        </div>
                    ) : (
                        <p style={{ color: "red" }}>Invalid role! Please check your profile.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
 
export default MyProfile;