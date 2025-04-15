import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteNotification from "./notificationDelete";
import Banner from "../Banner";

const API_URL = "https://localhost:7150/api/Notifications";

const GetNotifications = () => {
    const userId = localStorage.getItem("user_id");
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bannerMessage, setBannerMessage] = useState("");
    const [showBanner, setShowBanner] = useState(false);
    const itemsPerPage = 3;

    const loadNotificationsByUserId = async () => {
        if (!userId?.trim()) {
            setBannerMessage("Please enter a valid User ID.");
            setShowBanner(true);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/ByUID/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotifications(response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)));
        } catch (error) {
            console.error("Error fetching notifications by User ID:", error.message);
            setBannerMessage("Failed to fetch notifications. Please try again.");
            setShowBanner(true);
        }
    };

    const handleDeleteSuccess = (deletedId) => {
        setNotifications(notifications.filter((n) => n.notification_Id !== deletedId));
        setBannerMessage("Notification deleted successfully!");
        setShowBanner(true);
    };

    useEffect(() => {
        loadNotificationsByUserId();
    }, []);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNotifications = notifications.slice(startIndex, endIndex);
    const totalPages = Math.ceil(notifications.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const closeBanner = () => {
        setShowBanner(false);
    };

    return (
        <div>
            {showBanner && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Use Banner component */}
            <h3>My Notifications</h3>
            <table border="1" style={{ marginTop: "1rem", borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Sender ID</th>
                        <th>Receiver ID</th>
                        <th>Message</th>
                        <th>Timestamp</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentNotifications.map((notification) => (
                        <tr key={notification.notification_Id}>
                            <td>{notification.sendersId}</td>
                            <td>{notification.receiversId}</td>
                            <td>{notification.notification_Descpirtion}</td>
                            <td>{new Date(notification.createdDate).toLocaleString()}</td>
                            <td>
                                <DeleteNotification
                                    notificationId={notification.notification_Id}
                                    onDeleteSuccess={handleDeleteSuccess}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page + 1}
                        onClick={() => handlePageChange(page + 1)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                            backgroundColor: currentPage === page + 1 ? "#007BFF" : "#f1f1f1",
                            color: currentPage === page + 1 ? "#fff" : "#000",
                            border: "1px solid #ccc",
                            borderRadius: "3px",
                        }}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GetNotifications;
