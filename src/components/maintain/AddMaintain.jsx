import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotiBtn from "../notification/NotiBtn";

// Define API URLs
const API_URL = "https://localhost:7150/api/Maintainances?";
const userId = localStorage.getItem("user_id");
 
const AddMaintain = () => {
  const [formData, setFormData] = useState({
    propertyId: 0, tenantId: userId, description: "", status: "Pending", imagePath: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
  
    const toggleDropdown = () => {
      setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };
  
    const handleLogout = () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login after logout
    };
 
  // Add a new request (POST) using query parameters
  const addRequest = async () => {
    const token = localStorage.getItem('token');
    try {
      const addUrl = `${API_URL}PropertyId=${formData.propertyId}&TenantId=${formData.tenantId}&Description=${formData.description}&Status=${formData.status}&ImagePath=${formData.imagePath}`;
      console.log(addUrl)
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(addUrl, {}, { headers });
      alert("Request inserted successfully"); // Display success message
      resetForm();
    } catch (error) {
      setError("Error adding request: " + (error.response?.data?.message || error.message));
    }
  };
 
  // Reset the form
  const resetForm = () => {
    setFormData({
      propertyId: 0, tenantId: userId, description: "", status: "Pending", imagePath: ""
    });
  };
 
  // Handle form input changes
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
      <h2>Add a Maintenance Request</h2>
      {error && <p className="error">{error}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addRequest();
        }}
      >
        <div>
          <label>Tenant ID:</label>
          <input
            type="text"
            name="tenantId"
            value={formData.tenantId}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <label>Property ID:</label>
          <input
            type="number"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image Path:</label>
          <input
            type="text"
            name="imagePath"
            value={formData.imagePath}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Add Request"}
        </button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
    </div>
  );
};
 
export default AddMaintain;