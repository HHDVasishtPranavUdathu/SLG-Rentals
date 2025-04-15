import React from "react";
import axios from "axios";

const API_URL = "https://localhost:7150/api/Notifications";

const DeleteNotification = ({ notificationId, onDeleteSuccess }) => {
    const deleteNotification = async () => {
        if (!window.confirm("Are you sure you want to delete this notification?")) {
            return;
        }
        try {
            const token = localStorage.getItem('token');
                        
            await axios.delete(`${API_URL}/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token
                },
            });
            alert("Notification deleted successfully.");
            onDeleteSuccess(notificationId); // Notify parent component of successful deletion
        } catch (error) {
            console.error("Error deleting notification:", error.message);
            alert("Failed to delete notification. Please try again.");
        }
    };

    return (
        <button onClick={deleteNotification} style={{ padding: "0.5rem 1rem", border: "none", backgroundColor: "red", color: "#fff", borderRadius: "8px", cursor: "pointer" }}>
            Delete
        </button>
    );
};

export default DeleteNotification;
