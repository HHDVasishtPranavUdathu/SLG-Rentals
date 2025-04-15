import React, { useState, useEffect } from "react";
import Banner from "../Banner"; // Import the Banner component

const API_URL = "https://localhost:7150/api/lease";

const GetLeasesByOwner = () => {
    const [leases, setLeases] = useState([]);
    const [bannerMessage, setBannerMessage] = useState(""); // State for the banner message
    const [showBanner, setShowBanner] = useState(false); // State to show/hide the banner

    const loadLeasesByOwner = async () => {
        const ownerId = localStorage.getItem("user_id");

        if (!ownerId?.trim()) {
            setBannerMessage("Please provide a valid Owner ID.");
            setShowBanner(true);
            return;
        }

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setBannerMessage("You are not authenticated. Please log in.");
                setShowBanner(true);
                return;
            }

            const response = await fetch(`${API_URL}/ownersleases/${ownerId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setLeases(result);
        } catch (error) {
            console.error("Error fetching leases:", error.message);
            setBannerMessage("Failed to fetch leases.");
            setShowBanner(true);
        }
    };

    const closeBanner = () => {
        setShowBanner(false); // Close the banner when user clicks the "Close" button
    };

    useEffect(() => {
        loadLeasesByOwner();
    }, []);

    return (
        <div>
            {showBanner && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Use Banner component */}
            <h3>Leases Owned</h3>
            {leases.length > 0 ? (
                <div>
                    <ul>
                        {leases.map((lease) => (
                            <li key={lease.leaseId}>
                                Lease ID: {lease.leaseId}, Tenant ID: {lease.id}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No leases found.</p>
            )}
        </div>
    );
};

export default GetLeasesByOwner;
