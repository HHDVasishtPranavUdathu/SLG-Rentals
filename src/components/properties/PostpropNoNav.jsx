import React, { useState, useEffect } from "react";
import axios from "axios";
import Banner from "../Banner";
import './Property.css';

const API_URL = "https://localhost:7150/api/Properties";

const PostProperty = () => {
    const [formData, setFormData] = useState({
        address: "",
        description: "",
        availableStatus: "false",
        owner_Signature: "",
        priceOfTheProperty: 0,
        image: "" // Added image field
    });
    const [properties, setProperties] = useState([]);
    const [bannerMessage, setBannerMessage] = useState("");
    const userId = localStorage.getItem('user_id') || ''; 
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
            setBannerMessage("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(API_URL, new URLSearchParams({
                address,
                description,
                priceOfTheProperty,
                availableStatus,
                owner_Id: userId, // Use the owner ID from localStorage
                owner_Signature,
                image // Include image in the request
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                }
            });

            setFormData({
                address: "",
                description: "",
                priceOfTheProperty: 0,
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container">
            <h4>Your Properties:</h4>
            <div className="property-container">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div className="property-card" key={property.property_Id}>
                            <img src={property.iimage} alt="Property" className="property-image" />
                            <h3>{property.address}</h3>
                            <p>{property.description}</p>
                            <p>Price: {property.priceOfTheProperty}</p>
                            <p>Status: {property.availableStatus}</p>
                            <p>Owner ID: {property.owner_Id}</p>
                            <p>Owner Name: {property.owner_Name}</p>
                            <p>Phone Number: {property.owner_PhoneNumber}</p>
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
