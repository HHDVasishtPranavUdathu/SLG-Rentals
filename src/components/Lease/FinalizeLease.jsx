import React, { useState, useEffect } from "react";
import Banner from "../Banner"; // Import the Banner component
import axios from "axios"; // Import axios for API requests

const API_URL = "https://localhost:7150/api/lease";

const FinalizeLease = () => {
    const [leaseId, setLeaseId] = useState(""); // State for selected leaseId
    const [ownerId, setOwnerId] = useState(""); // State for ownerId
    const [signature, setSignature] = useState(""); // State for signature
    const [leases, setLeases] = useState([]); // State for dropdown options
    const [bannerMessage, setBannerMessage] = useState(""); // State for banner message
    const [showBanner, setShowBanner] = useState(false); // State for banner visibility

    // Fetch leases for the dropdown
    useEffect(() => {
        const fetchLeases = async () => {
            try {
                const token = localStorage.getItem("token");
                const ownerId = localStorage.getItem("user_id"); // Assuming ownerId is stored in localStorage

                if (!token || !ownerId) {
                    setBannerMessage("You are not authenticated or owner ID is missing.");
                    setShowBanner(true);
                    return;
                }

                const response = await axios.get(`${API_URL}/ownersleases/${ownerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLeases(response.data); // Populate leases for dropdown
            } catch (error) {
                console.error("Error fetching leases:", error.message);
                setBannerMessage("Failed to fetch leases.");
                setShowBanner(true);
            }
        };

        fetchLeases();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setBannerMessage("You are not authenticated. Please log in.");
                setShowBanner(true);
                return;
            }

            const queryParams = new URLSearchParams({
                leaseId,
                ownerId,
                signature,
            }).toString();

            const response = await fetch(`${API_URL}/ownerval?${queryParams}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Failed to finalize lease.");
            }

            const result = await response.text();
            setBannerMessage(result); // Show success message in banner
            setShowBanner(true);
        } catch (error) {
            console.error("Error finalizing lease:", error.message);
            setBannerMessage("Failed to finalize lease."); // Show error message in banner
            setShowBanner(true);
        }
    };

    const closeBanner = () => {
        setShowBanner(false); // Close the banner when user clicks "Close"
    };

    return (
        <div>
            {showBanner && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Use Banner component */}
            <h3>Finalize Lease</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Dropdown for Lease Selection */}
                <div>
                    <label htmlFor="leaseDropdown" style={{ fontWeight: "bold", marginBottom: "5px" }}>
                        Select Lease:
                    </label>
                    <select
                        id="leaseDropdown"
                        value={leaseId}
                        onChange={(e) => setLeaseId(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "16px",
                            backgroundColor: "#f9f9f9",
                            appearance: "none",
                            cursor: "pointer",
                        }}
                        required
                    >
                        <option value="" disabled>
                            Select Lease
                        </option>
                        {leases.map((lease) => (
                            <option key={lease.leaseId} value={lease.leaseId}>
                                Lease ID:{lease.leaseId} -Tenant ID: {lease.id} -Property ID: {lease.property_Id}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Input for Owner ID */}
                <input
                    type="text"
                    placeholder="Owner ID"
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}
                    style={{
                        width: "97%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                    }}
                    required
                />

                {/* Input for Signature */}
                <input
                    type="text"
                    placeholder="Signature"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    style={{
                        width: "97%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                    }}
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                >
                    Finalize Lease
                </button>
            </form>
        </div>
    );
};

export default FinalizeLease;
