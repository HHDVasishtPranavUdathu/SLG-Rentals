import React, { useState } from "react";
import Banner from "../Banner"; // Import the Banner component

const API_URL = "https://localhost:7150/api/lease";

const CreateLease = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [signature, setSignature] = useState("");
    const [bannerMessage, setBannerMessage] = useState(""); // State for banner message
    const [showBanner, setShowBanner] = useState(false); // State to show/hide banner

    const handleStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value); // Selected start date
        const today = new Date(); // Current date

        // Reset time to avoid time mismatches
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setBannerMessage("Start date cannot be in the past.");
            setShowBanner(true);
        } else {
            setStartDate(e.target.value); // Valid date
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const today = new Date();
        const selectedStartDate = new Date(startDate);
        const selectedEndDate = new Date(endDate);

        // Validate Start Date and End Date
        if (selectedStartDate < today) {
            setBannerMessage("Start date cannot be in the past.");
            setShowBanner(true);
            return;
        }
        if (selectedEndDate <= selectedStartDate) {
            setBannerMessage("End date must be after the start date.");
            setShowBanner(true);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("user_id");
            const prop = localStorage.getItem("prop");

            if (!token || !userId) {
                setBannerMessage("Token or User ID is missing. Please log in.");
                setShowBanner(true);
                return;
            }

            const queryParams = new URLSearchParams({
                tenantId: userId,
                propertyId: prop,
                startDate,
                endDate,
                signature,
            }).toString();

            const response = await fetch(`${API_URL}/applytenant?${queryParams}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const responseText = await response.text();
            if (!response.ok) {
                throw new Error(responseText);
            }

            setBannerMessage(responseText);
            setShowBanner(true);
        } catch (error) {
            console.error("Error while creating lease:", error.message);
            setBannerMessage("Failed to create lease. Please try again.");
            setShowBanner(true);
        }
    };

    const closeBanner = () => {
        setShowBanner(false);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem", fontFamily: "Arial, sans-serif" }}>
            {showBanner && (
                <Banner
                    message={bannerMessage}
                    onClose={closeBanner}
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        backgroundColor: "#ffc107",
                        color: "#000",
                        padding: "1rem",
                        textAlign: "center",
                        zIndex: "1000",
                        fontSize: "1rem",
                    }}
                />
            )}
            <h3 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
                Create Lease
            </h3>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    backgroundColor: "#f9f9f9",
                    padding: "1rem",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <input
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    required
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "1rem",
                    }}
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "1rem",
                    }}
                />
                <input
                    type="text"
                    placeholder="Signature"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    required
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "1rem",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                >
                    Create Lease
                </button>
            </form>
        </div>
    );
};

export default CreateLease;
