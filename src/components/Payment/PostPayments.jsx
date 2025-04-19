import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NotiBtn from "../notification/NotiBtn";
// import "./LeasePayment.css"; // Importing CSS for styling

const userId = localStorage.getItem("user_id");
const API_URL = `https://localhost:7150/api/Lease/GetLeasesByTenantId/${userId}`;
const PROPERTY_URL = `https://localhost:7150/api/Properties/`;
const BASE_URL = `https://localhost:7150/api/Payments`;
const token = localStorage.getItem("token");

const LeasePayment = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility

    const [leases, setLeases] = useState([]); // Leases data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [payError, setPayError] = useState(null); // Error state
    const [sucess, setSucess] = useState(null); // Error state
    const [formData, setFormData] = useState({
        tenant_Id: userId,
        propertyId: 0,
        amount: 0,
        status: "",
        ownerstatus: "",
    });



    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login after logout
    };
    const [showModal, setShowModal] = useState(false); // Controls modal visibility

    useEffect(() => {
        fetchLeases();
    }, []);

    const fetchLeases = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setLeases(data); // Update leases data
        } catch (error) {
            console.error("Error fetching leases:", error);
            setError("Failed to fetch leases. Please try again.");
            setLeases([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchProperty = async (property_Id) => {
        setLoading(true);
        setError(null);
        let data;
        try {
            const response = await fetch(PROPERTY_URL + property_Id, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            data = await response.json();
        } catch (error) {
        } finally {
            setLoading(false);
        }
        return data;
    }

    const handlePayment = async (propertyId) => {
        console.log(`Button clicked for propertyId: ${propertyId}`); // Debugging log
        setPayError(null);
        setSucess(false);

        const selectedLease = leases.find((lease) => lease.property_Id === propertyId);
        const data = await fetchProperty(propertyId);
        if (selectedLease) {
            setFormData((prevData) => ({
                ...prevData,
                propertyId,
                amount: data?.priceOfTheProperty || 0, // Dynamically set the amount
            }));
        }

        setShowModal(true); // Show the modal
    };

    const addPayment = async () => {
        setPayError(null);
        setSucess(false);
        try {
            const addUrl = `${BASE_URL}?Tenant_Id=${formData.tenant_Id}&PropertyId=${formData.propertyId}&status=${formData.status}`;
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.post(addUrl, {}, { headers }); // Sending POST request
            // alert("Payment added successfully!");
            setSucess(true);
            setTimeout(() => {
                resetForm();
                setShowModal(false);
                setSucess(false);
            }, 2000);
        } catch (error) {
            console.error("Error adding payment:", error.response || error.message);
            setPayError(error.response.data.message)
        }
    };

    const resetForm = () => {
        setFormData({
            tenant_Id: userId,
            propertyId: 0,
            amount: 0,
            status: "",
            ownerstatus: "",
        });
        setShowModal(false); // Close the modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        
            <div className="container">
                <header className="header">
                    <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
                    <div className="header-links">
                        <Link to="/lease/tenant" className="link-default">Lease</Link>
                        <Link to="/GetProperties" className="link-primary">All Properties ↓</Link>
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
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <h1 style={{ marginLeft: "20px" }}>Leased Properties</h1>
                    <Link to="/post" style={{ textDecoration: "none", marginRight: "10px" }}>Payment Hisory</Link>
                </div>
                <div className="contain">
                    <h2>Lease Payment System</h2>
                    {loading && <p>Loading leases...</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {!loading && !error && leases.length === 0 && <p>No leases found.</p>}
                    {!loading && !error && leases.length > 0 && (
                        <div className="button-grid">
                            {leases.map((lease) => (
                                <button
                                    key={lease.leaseId}
                                    className="big-button"
                                    onClick={() => handlePayment(lease.property_Id)}
                                >
                                    {lease.property_Id}
                                </button>
                            ))}
                        </div>
                    )}
                    {/* Modal */}
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Make Payment</h2>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        addPayment();
                                    }}
                                >
                                    <div>
                                        <label>Property ID:</label>
                                        <input
                                            type="number"
                                            name="propertyId"
                                            value={formData.propertyId}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label>Amount:</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label>Status:</label>
                                        <input
                                            type="text"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        {/* <label>Owner Status:</label>
                    <input
                      type="text"
                      name="ownerstatus"
                      value={formData.ownerstatus}
                      onChange={handleInputChange}
                      required
                    /> */}
                                    </div>
                                    <button type="submit">Add Payment</button>
                                    <button type="button" onClick={resetForm}>
                                        Cancel
                                    </button>
                                </form>
                                {payError && <h5 style={{ color: "red" }}>{payError}</h5>}
                                {sucess && <h5 style={{ color: "blue" }}>Payment completed successfully!</h5>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default LeasePayment;