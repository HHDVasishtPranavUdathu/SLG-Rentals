import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostNotification from "./notificationPost";
import GetNotifications from "./notificationRead";
import NotiBtn from "./NotiBtn";

const NotificationCRUD = () => {
    const [activeTab, setActiveTab] = useState("read");

    return (
        <div className="container">
            <header className="header">
                <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
                <div className="header-links">
                    <Link to="/lease/tenant" className="link-default">Lease</Link>
                    <Link to="/Maintainance" className="link-default">Maintainance</Link>
                    <NotiBtn />
                </div>
            </header>
            <h1>Notifications</h1>
            <div className="tabs">
                <button
                    className={activeTab === "read" ? "active-tab" : ""}
                    onClick={() => setActiveTab("read")}
                >
                    Get Notifications
                </button>
                <button
                    className={activeTab === "post" ? "active-tab" : ""}
                    onClick={() => setActiveTab("post")}
                >
                    Post Notification
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === "read" && <GetNotifications />}
                {activeTab === "post" && <PostNotification />}
            </div>

            {/* Optional CSS styling for tabs */}
            <style jsx>{`
                .tabs {
                    display: flex;
                    justify-content: space-around;
                    margin-bottom: 20px;
                }
                button {
                    padding: 10px 20px;
                    cursor: pointer;
                    border: none;
                    background:rgba(0, 123, 255, 0.49);
                    border-radius: 5px;
                }
                .active-tab {
                    background: #007bff;
                    color: white;
                }
                .tab-content {
                    border: 1px solid #ccc;
                    padding: 20px;
                    border-radius: 5px;
                }
            `}</style>
        </div>
    );
};

export default NotificationCRUD;
