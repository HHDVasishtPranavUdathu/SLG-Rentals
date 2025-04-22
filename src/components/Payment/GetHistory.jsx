import React, { useState } from "react";

import NotiBtn from "../notification/NotiBtn";
import { Link } from "react-router-dom";
import "./get.css"

const OwnerTenantHistory = () => {
  const [tenantId, setTenantId] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility

  const [tenantDetails, setTenantDetails] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchHistoryByTenantId = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = `https://localhost:7150/api/History/owner-tenant-history/${tenantId}`;
      const response = await fetch(API_URL, {
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

      // Assume username and phone number are always the same; extracted once
      const { tenant_name, tenant_Phonenumber, ...otherDetails } = data[0];
      setTenantDetails({ tenant_name, tenant_Phonenumber });
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setError("Failed to fetch history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHistoryByTenantId();
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
      <h2>Search Owner-Tenant History</h2>
      {/* Form to input tenant ID */}
      <form onSubmit={handleSubmit}>
        <label>
          Tenant ID:
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading history...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Display tenant details once */}
      {tenantDetails && (
        <div>
          <h3>Tenant Information</h3>
          <p>
            <strong>Username:</strong> {tenantDetails.tenant_name}
            <br />
            <strong>Phone Number:</strong> {tenantDetails.tenant_Phonenumber}
          </p>
        </div>
      )}

      {/* Display history details */}
      {!loading && !error && history.length > 0 && (
        <div>
          <h3>Leased Property History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <strong>Leased Property ID:</strong> {item.leased_property_id}
                <br />
                <strong>Start Time:</strong> {new Date(item.startTime).toLocaleDateString()}
                <br />
                <strong>End Time:</strong> {new Date(item.endTime).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OwnerTenantHistory;
