import React, { useState } from "react";
import axios from "axios";
import Banner from "../Banner"; // Import Banner

const API_URL = "https://localhost:7150/api/Notifications";

const DeleteNotification = ({ notificationId, onDeleteSuccess }) => {
    const [bannerMessage, setBannerMessage] = useState(""); // State for banner message
    const [showBanner, setShowBanner] = useState(false); // State to show/hide banner

    const deleteNotification = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_URL}/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token
                },
            });
            setBannerMessage("Notification deleted successfully.");
            setShowBanner(true); // Show banner with success message
            onDeleteSuccess(notificationId); // Notify parent component of successful deletion
        } catch (error) {
            console.error("Error deleting notification:", error.message);
            setBannerMessage("Failed to delete notification. Please try again.");
            setShowBanner(true); // Show banner with error message
        }
    };

    const closeBanner = () => {
        setShowBanner(false); // Close the banner
    };

    return (
        <div style={{ position: "relative" }}>
            {showBanner && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Banner for displaying messages */}
            <button
                onClick={deleteNotification}
                style={{
                    padding: "0.5rem 1rem",
                    border: "none",
                    backgroundColor: "red",
                    color: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default DeleteNotification;
