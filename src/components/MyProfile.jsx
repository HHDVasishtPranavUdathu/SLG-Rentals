import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProfile = () => {
    const [profile, setProfile] = useState(null); // State to hold profile data
    const [error, setError] = useState(null); // State to handle errors

    // Fetch the userId from localStorage
    const userId = localStorage.getItem("user_id"); // Make sure this key matches your app's setup
    const API_URL = `https://localhost:7150/api/Registrations/${userId}`;

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
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>My Profile</h2>
            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px" }}>
                <p><strong>ID:</strong> {profile.id}</p>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                <p><strong>Date of Birth:</strong> {profile.d_O_B}</p>
                <p><strong>Role:</strong> {profile.roleofUser}</p>
                <p><strong>Signature:</strong> {profile.signature}</p>
            </div>
        </div>
    );
};

export default MyProfile;
