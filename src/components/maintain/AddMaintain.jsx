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
                    <Link to="/login" className="link-default">Login</Link>
                    <Link to="/register" className="link-default">Register</Link>
                    <Link to="/properties" className="link-primary">See Properties ↓</Link>
                    <NotiBtn />
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