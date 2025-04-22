import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Banner";
import './Property.css';
import NotiBtn from "../notification/NotiBtn";
import { useNavigate, Link } from 'react-router-dom';


const API_URL = "https://localhost:7150/api/Properties";

const PostProperty = () => {
    const [formData, setFormData] = useState({
        address: "",
        description: "",
        availableStatus: "false",
        owner_Signature: "",
        priceOfTheProperty: 0.0,
        image: "" // Added image field
    });
    const [properties, setProperties] = useState([]);
    const [bannerMessage, setBannerMessage] = useState("");
    const userId = localStorage.getItem('user_id') || ''; // Automatically fetch owner ID
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (userId) {
            fetchPropertiesByUserId(userId);
        }
    }, [userId]);

    const fetchPropertiesByUserId = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/owner/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
        const { address, description, priceOfTheProperty, availableStatus, owner_Signature, image } = formData;
    
        if (!address || !description || !priceOfTheProperty || !availableStatus || !owner_Signature || !image) {
            setBannerMessage("All fields are required."); // Show error in the banner
            return;
        }
        console.log("Form data being sent:", formData);
    
        try {
            const response = await axios.post(API_URL, new URLSearchParams({
                address,
                description,
                owner_Id: userId, // Use the owner ID from localStorage
                availableStatus,
                owner_Signature,
                Price: priceOfTheProperty, // Ensure this matches the backend parameter name
                image
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            setFormData({
                address: "",
                description: "",
                priceOfTheProperty: 0.0, // Reset to 0.0 instead of an empty string
                availableStatus: "false",
                owner_Signature: "",
                image: ""
            });
            setBannerMessage("Property added successfully!"); // Show success message in banner
            fetchPropertiesByUserId(userId); // Refresh properties
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setBannerMessage("Property already exists!");
            } else {
                setBannerMessage("Error saving property. Please try again."); // Show error in the banner
                console.error("Error saving property:", error.response || error.message);
            }
        }
    };
    

    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    };
    const deleteProperty = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchPropertiesByUserId(userId); // Refresh data
        } catch (error) {
            console.error("Error deleting property:", error);
        }
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
                    <Link to="/PostProperties" className="link-primary">All Properties ↓</Link>
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
            <h2>Property Management</h2>
            {bannerMessage && <Banner message={bannerMessage} onClose={() => setBannerMessage("")} />} {/* Error/Success messages in banner */}
            {userId.startsWith("O") && (
                <form onSubmit={handleSubmit} className="property-form">
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            id="address"
                            type="text"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            id="description"
                            type="text"
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priceOfTheProperty">Price:</label>
                        <input
                            type="number"
                            placeholder="Price"
                            value={formData.priceOfTheProperty}
                            onChange={(e) => setFormData({ ...formData, priceOfTheProperty: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableStatus">Availability:</label>
                        <select
                            id="availableStatus"
                            value={formData.availableStatus}
                            onChange={(e) => setFormData({ ...formData, availableStatus: e.target.value })}
                            required
                        >
                            <option value="false">Not Available</option>
                            <option value="true">Available</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ownerSignature">Owner Signature:</label>
                        <input
                            id="ownerSignature"
                            type="text"
                            placeholder="Enter owner signature"
                            value={formData.owner_Signature}
                            onChange={(e) => setFormData({ ...formData, owner_Signature: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL:</label>
                        <input
                            id="image"
                            type="text"
                            placeholder="Enter image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit">Add Property</button>
                </form>
            )}
            <h4>Your Properties:</h4>
            <div className="property-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {properties.length > 0 ? (
        properties.map((property) => (
            <div className="property-card" key={property.property_Id} style={{ flex: '1 1 calc(33.333% - 20px)', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <img src={property.image} alt="Property" className="property-image" style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                <h3>Property Id:{property.property_Id}</h3>
                <h3>{property.address}</h3>
                <p>{property.description}</p>
                <p>Price: {property.priceOfTheProperty}</p>
                <p>Status: {property.availableStatus === true ? "Available" : "Not Available"}</p> {/* Ensure status is displayed correctly */}
                <p>Owner ID: {property.owner_Id}</p>
                <p>Owner Name: {property.owner_Name}</p>
                <p>Phone Number: {property.owner_PhoneNumber}</p>
                <button
                    onClick={() => {
                        deleteProperty(property.property_Id);
                        setBannerMessage("Property deleted successfully!"); // Show success message in banner
                    }}
                    style={{
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        marginTop: "10px"
                    }}
                >
                    Delete
                </button>
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
