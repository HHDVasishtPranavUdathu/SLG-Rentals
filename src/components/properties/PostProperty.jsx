import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Banner"; // Import the Banner component
import './Property.css'; // Import the CSS file

const API_URL = "https://localhost:7150/api/Properties";

const PostProperty = () => {
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    owner_Id: "",
    availableStatus: "false",
    owner_Signature: "",
    priceOfTheProperty: 0
  });
  const [properties, setProperties] = useState([]);
  const [errors, setErrors] = useState({});
  const [bannerMessage, setBannerMessage] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem('Userid') || '');
  const token = localStorage.getItem('token'); // Retrieve token from local storage

  useEffect(() => {
    if (userId) {
      fetchPropertiesByUserId(userId);
    }
  }, [userId]);

  const fetchPropertiesByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/owner/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Add token to headers
        }
      });
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setBannerMessage(`No properties found for owner ID: ${userId}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { address, description, priceOfTheProperty, availableStatus, owner_Id, owner_Signature } = formData;

    if (!address || !description || !priceOfTheProperty || !availableStatus || !owner_Id || !owner_Signature) {
      setErrors({ form: "All fields are required." });
      return;
    }

    try {
      const response = await axios.post(API_URL, new URLSearchParams({
        address,
        description,
        priceOfTheProperty,
        availableStatus,
        owner_Id,
        owner_Signature
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}` // Add token to headers
        }
      });
      
      setFormData({
        address: "",
        description: "",
        priceOfTheProperty: 0,
        availableStatus: "false",
        owner_Id: "",
        owner_Signature: ""
      });
      setErrors({});
      setBannerMessage("Property added successfully!");
      fetchPropertiesByUserId(userId); // Refresh properties
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setBannerMessage("Property already exists!");
      } else {
        console.error("Error saving property:", error.response || error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2>Property Management</h2>
      {bannerMessage && <Banner message={bannerMessage} onClose={() => setBannerMessage("")} />}
      {userId.startsWith("O") && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
          {errors.address && <span>{errors.address}</span>}
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          {errors.description && <span>{errors.description}</span>}
          <input
            type="number"
            placeholder="Price"
            value={formData.priceOfTheProperty}
            onChange={(e) => setFormData({ ...formData, priceOfTheProperty: e.target.value })}
            required
          />
          {errors.priceOfTheProperty && <span>{errors.priceOfTheProperty}</span>}
          <select
            value={formData.availableStatus}
            onChange={(e) => setFormData({ ...formData, availableStatus: e.target.value })}
            required
          >
            <option value="false">Not Available</option>
            <option value="true">Available</option>
          </select>
          {errors.availableStatus && <span>{errors.availableStatus}</span>}
          <input
            type="text"
            placeholder="Owner ID"
            value={formData.owner_Id}
            onChange={(e) => setFormData({ ...formData, owner_Id: e.target.value })}
            required
          />
          {errors.owner_Id && <span>{errors.owner_Id}</span>}
          <input
            type="text"
            placeholder="Owner Signature"
            value={formData.owner_Signature}
            onChange={(e) => setFormData({ ...formData, owner_Signature: e.target.value })}
            required
          />
          {errors.owner_Signature && <span>{errors.owner_Signature}</span>}
          <button type="submit">Add Property</button>
          {errors.form && <span>{errors.form}</span>}
        </form>
      )}

      <div className="property-container">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="property-card" key={property.property_Id}>
              <h3>{property.address}</h3>
              <p>{property.description}</p>
              <p>Price: {property.priceOfTheProperty}</p>
              <p>Status: {property.availableStatus}</p>
              <p>Owner ID: {property.owner_Id}</p>
              <p>Owner Name: {property.owner_Name}</p>
              <p>Phone Number: {property.owner_PhoneNumber}</p>
              <p>Signature: {property.owner_Signature}</p>
            </div>
          ))
        ) : (
          <p>No properties found for owner ID: {userId}</p>
        )}
      </div>
    </div>
  );
};

export default PostProperty;
