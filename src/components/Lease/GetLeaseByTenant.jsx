import React, { useState, useEffect } from "react";
import Banner from "../Banner"; // Import the Banner component

const API_URL = "https://localhost:7150/api/lease";

const GetLeasesByTenantId = () => {
    const [leases, setLeases] = useState([]); // Array of leases
    const [bannerMessage, setBannerMessage] = useState(""); // State for banner message
    const [showBanner, setShowBanner] = useState(false); // State for showing/hiding banner

    // Function to fetch leases by tenant ID
    const handleSearch = async () => {
        try {
            const token = localStorage.getItem("token");
            const tenantId = localStorage.getItem("user_id"); // Retrieve tenant ID from localStorage

            if (!token) {
                setBannerMessage("Token is missing. Please log in.");
                setShowBanner(true);
                return;
            }

            if (!tenantId) {
                setBannerMessage("User ID is missing in localStorage. Please log in.");
                setShowBanner(true);
                return;
            }

            const response = await fetch(`${API_URL}/GetLeasesByTenantId/${tenantId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setLeases(result); // Populate leases with data from the API
        } catch (error) {
            console.error("Error fetching leases:", error.message);
            setBannerMessage(`Error: ${error.message}`); // Display error message in banner
            setShowBanner(true);
            setLeases([]); // Clear leases data
        }
    };

    // Automatically fetch data when the component mounts
    useEffect(() => {
        handleSearch();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const closeBanner = () => {
        setShowBanner(false); // Close the banner
    };

    return (
        <div>
            {showBanner && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Use Banner component */}
            <h3>Leases for Tenant</h3>

            {/* Display lease details if available */}
            {leases.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h4>Leases</h4>
                    <ul>
                        {leases.map((lease) => (
                            <li key={lease.LeaseId}>
                                <strong>Lease ID:</strong> {lease.leaseId}<br />
                                <strong>Property ID:</strong> {lease.property_Id}<br />
                                <strong>Start Date:</strong> {new Date(lease.startDate).toLocaleDateString()}<br />
                                <strong>End Date:</strong> {new Date(lease.endDate).toLocaleDateString()}<br />
                                <strong>Status:</strong> {lease.lease_status ? "Active" : "Inactive"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GetLeasesByTenantId;
