import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://localhost:7150/api/Notifications";

const NotiBtn = () => {
  const [topNotification, setTopNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const fetchTopNotification = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId?.trim()) {
      alert("User ID not recognised.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/ByUID/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Sort notifications by date and set the top one
      const sortedNotifications = response.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      setTopNotification(
        sortedNotifications[0]?.sendersId + " : "+ sortedNotifications[0]?.notification_Descpirtion || "No new notifications"
      );
    } catch (error) {
      console.error("Error fetching top notification:", error.message);
      alert("Failed to fetch notifications. Please try again.");
    }
  };

  const handleHover = () => {
    fetchTopNotification();
    setShowNotification(true);
  };

  const handleLeave = () => {
    setShowNotification(false);
  };

  const handleClick = () => {
    navigate("/noti"); // Redirects to /noti
  };

  return (
    <div style={{ position: "relative" }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <button
        onClick={handleClick}
        className="noti-btn"
        aria-label="Notifications"
      >
        🔔
      </button>
      {showNotification && topNotification && (
        <div className="notification-popup">
          {topNotification}
        </div>
      )}
    </div>
  );
};

export default NotiBtn;
