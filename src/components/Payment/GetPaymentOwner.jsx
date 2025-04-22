import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./GetPaymentsOwner.css";
import NotiBtn from "../notification/NotiBtn";

const ownerId = localStorage.getItem("user_id"); // Replace with dynamic logic if needed
const API_PAYMENT_URL = `https://localhost:7150/api/Payments/GetPaymentsByOwnerid/${ownerId}`;

const GetPaymentsByOwnerId = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null); // To track the selected payment for updating
    const token = localStorage.getItem("token");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login after logout
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_PAYMENT_URL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error("Error fetching payments:", error);
            setError("Failed to fetch payments. Please try again.");
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    const updatePaymentStatus = async (paymentId, status) => {
        try {
            await axios.put(
                `https://localhost:7150/api/Payments/${paymentId}`,
                status, // Sending updated ownerstatus ("True" or "False")
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            await fetchPayments(); // Refresh data
            setSelectedPayment(null); // Close modal-like hover card
        } catch (error) {
            console.error("Error updating payment status:", error);
            alert("Failed to update payment status. Please try again.");
        }
    };

    const getButtonColor = (ownerstatus) => {
        switch (ownerstatus) {
            case "True":
                return "button-green";
            case "False":
                return "button-red";
            default:
                return "button-gray";
        }
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
                <div className="header-links">
                    <Link to="/lease/owner" className="link-default">Lease</Link>
                    <Link to="/getpayowner" className="link-default">Payment</Link>
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
            
            <button style={{position: 'fixed', right: '10px', margin:'10px', bottom:'10px' }} onClick={()=>navigate('/tenantinfo')}>check tenant history</button>
            <h2>Payment for owner</h2>
            {loading && <p>Loading payments...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && payments.length === 0 && <p>No payments found.</p>}
            {!loading && !error && payments.length > 0 && (
                <div className="payment-buttons">
                    {payments.map((payment) => (
                        <div
                            key={payment.paymentID}
                            className={`payment-button ${getButtonColor(payment.ownerstatus)}`}
                            onClick={() => setSelectedPayment(payment)} // Open update hover card on click
                        >
                            <div className="payment-id">{`Payment ID: ${payment.paymentID}`}</div>
                            <div className="payment-details">
                                <strong>Tenant ID:</strong> {payment.tenant_Id}
                                <br />
                                <strong>Property ID:</strong> {payment.propertyId}
                                <br />
                                <strong>Amount:</strong> {payment.amount}
                                <br />
                                <strong>Status:</strong> {payment.status ? "Successful" : "Failed"}
                                <br />
                                <strong>Owner Status:</strong> {payment.ownerstatus}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Hover card/modal for updating payment */}
            {selectedPayment && (
                <div className="hover-card">
                    <h3>Update Owner Status</h3>
                    <p>
                        <strong>Payment ID:</strong> {selectedPayment.paymentID}
                        <br />
                        <strong>Tenant ID:</strong> {selectedPayment.tenant_Id}
                        <br />
                        <strong>Property ID:</strong> {selectedPayment.propertyId}
                        <br />
                        <strong>Amount:</strong> {selectedPayment.amount}
                        <br />
                        <strong>Owner Status:</strong> {selectedPayment.ownerstatus}
                    </p>
                    <div>
                        <button
                            className="button-green"
                            onClick={() => updatePaymentStatus(selectedPayment.paymentID, "True")}
                        >
                            Correct
                        </button>
                        <button
                            className="button-red"
                            onClick={() => updatePaymentStatus(selectedPayment.paymentID, "False")}
                        >
                            Wrong
                        </button>
                        <button className="button-gray" onClick={() => setSelectedPayment(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetPaymentsByOwnerId;