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
        <div style={{ padding: "1rem" }}>
            {showBanner && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Use Banner component */}
            <h3>Leases Owned</h3>

            {leases.length > 0 ? (
                <div style={{ marginTop: "20px", overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginBottom: "1rem",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#007bff", color: "black", textAlign: "left" }}>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Lease ID</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tenant ID</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Property ID</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start Date</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>End Date</th>
                                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leases.map((lease) => (
                                <tr key={lease.leaseId} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px" }}>{lease.leaseId}</td>
                                    <td style={{ padding: "10px" }}>{lease.id}</td>
                                    <td style={{ padding: "10px" }}>{lease.property_Id}</td>
                                    <td style={{ padding: "10px" }}>
                                        {new Date(lease.startDate).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                        {new Date(lease.endDate).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: "10px" }}>
                                        {lease.lease_status ? "Active" : "Inactive"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No leases found.</p>
            )}
        </div>
    );
};

export default GetLeasesByOwner;
