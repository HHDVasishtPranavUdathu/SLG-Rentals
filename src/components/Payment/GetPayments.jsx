import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./GetPayments.css"; // Import the CSS file
import NotiBtn from "../notification/NotiBtn";
 
const userId = localStorage.getItem("user_id");
const API_URL = `https://localhost:7150/api/Payments/GetPaymentsByTenant/${userId}`;
 
const GetPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]); // For filtering
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // Current filter type
  const [startDate, setStartDate] = useState(""); // Start date for interval
  const [endDate, setEndDate] = useState(""); // End date for interval
  const [specificDate, setSpecificDate] = useState(""); // Specific date filter
  const token = localStorage.getItem("token");
 
  const navigate = useNavigate(); // Initialize navigate hook for back button
 
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
    
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
 
  useEffect(() => {
    applyFilter(); // Apply the filter whenever filter options change
  }, [filter, payments, startDate, endDate, specificDate]);
 
  const fetchPayments = async () => {
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
      setPayments(data);
      setFilteredPayments(data); // Default to showing all payments
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError("Failed to fetch payments. Please try again.");
      setPayments([]);
      setFilteredPayments([]);
    } finally {
      setLoading(false);
    }
  };
 
  const applyFilter = () => {
    switch (filter) {
      case "specificDate":
        if (specificDate) {
          setFilteredPayments(
            payments.filter((payment) => {
              const paymentDate = new Date(payment.paymentDate).toISOString().split("T")[0];
              return paymentDate === specificDate;
            })
          );
        }
        break;
      case "interval":
        if (startDate && endDate) {
          setFilteredPayments(
            payments.filter((payment) => {
              const paymentDate = new Date(payment.paymentDate).toISOString().split("T")[0];
              return paymentDate >= startDate && paymentDate <= endDate;
            })
          );
        }
        break;
      case "reds":
        setFilteredPayments(
          payments.filter(
            (payment) =>
              payment.ownerstatus.toString().toLowerCase() === "false"
          )
        );
        break;
      case "greens":
        setFilteredPayments(
          payments.filter(
            (payment) =>
              payment.ownerstatus.toString().toLowerCase() === "true"
          )
        );
        break;
      case "defaults":
        setFilteredPayments(
          payments.filter(
            (payment) =>
              payment.ownerstatus.toString().toLowerCase() !== "true" &&
              payment.ownerstatus.toString().toLowerCase() !== "false"
          )
        );
        break;
      default:
        setFilteredPayments(payments); // Show all payments by default
    }
  };
 
  const getButtonColor = (ownerstatus) => {
    switch (ownerstatus) {
      case "true":
        return "button-green";
      case "false":
        return "button-red";
      case "False":
        return "button-red";
      case "Active":
        return "button-orange";
      case "True":
        return "button-green";
      default:
        return "button-gray";
    }
  };
 
  return (
    <div className="container">
    <header className="header">
        <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
        <div className="header-links">
          <Link to="/lease/tenant" className="link-default">Lease</Link>
          <Link to="/postpayment" className="link-primary">Payment</Link>
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
      {/* Back Arrow Button */}
 
      <div className="filter-container">
        <button
          className="back-button"
          onClick={() => navigate("/postpayments")} // Navigate to Payments Home Page
        >
          ←
        </button>
      </div>
      <div className="filter-container">
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="specificDate">Specific Date</option>
          <option value="interval">Interval</option>
          <option value="reds">Rejected</option>
          <option value="greens">Accepted</option>
          <option value="defaults">Active</option>
        </select>
     
        {filter === "specificDate" && (
          <div className="date-filter">
            <label>
              Specific Date:
              <input
                type="date"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
              />
            </label>
          </div>
        )}
 
        {filter === "interval" && (
          <div className="interval-filter">
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>
 
      {loading && <p>Loading payments...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && filteredPayments.length === 0 && (
        <p>No payments found.</p>
      )}
      {!loading && !error && filteredPayments.length > 0 && (
        <div className="payment-buttons">
          {filteredPayments.map((payment) => (
            <div
              key={payment.paymentID}
              className={`payment-button ${getButtonColor(payment.ownerstatus)}`}
            >
              <div className="payment-id">{`Payment ID: ${payment.paymentID}`}</div>
              <div className="payment-details">
                <strong>Property ID:</strong> {payment.propertyId}
                <br />
                <strong>Amount:</strong> {payment.amount}
                <br />
                <strong>Status:</strong> {payment.status}
                <br />
                <strong>Owner Status:</strong> {payment.ownerstatus.toString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default GetPayments;