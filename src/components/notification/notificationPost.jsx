import React, { useState, useEffect } from "react";
import axios from "axios";

const NOTIFICATION_API_URL = "https://localhost:7150/api/Notifications";
const REGISTRATIONS_API_URL = "https://localhost:7150/api/Registrations";

const PostNotification = () => {
    const sendersId = localStorage.getItem("user_id");
    const [formData, setFormData] = useState({
        sendersId: sendersId,
        receiversId: "",
        notification_Descpirtion: "",
    });
    const [receivers, setReceivers] = useState([]); // State for dropdown options

    useEffect(() => {
        const fetchReceivers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(REGISTRATIONS_API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReceivers(response.data);
            } catch (error) {
                console.error("Error fetching receivers:", error.message);
            }
        };
        fetchReceivers();
    }, []);

    const postNotification = async (e) => {
        e.preventDefault();
        if (!formData.sendersId || !formData.receiversId || !formData.notification_Descpirtion.trim()) {
            alert("All fields are required!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                NOTIFICATION_API_URL,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Notification posted successfully!");
            setFormData({
                sendersId: sendersId,
                receiversId: "",
                notification_Descpirtion: "",
            });
        } catch (error) {
            console.error("Error posting notification:", error.message);
            alert("Failed to post notification. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Post a New Notification</h3>
            <form onSubmit={postNotification} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Dropdown for Receivers */}
                <div style={{ position: "relative" }}>
                    <label htmlFor="receiversDropdown" style={{ marginBottom: "5px", fontWeight: "bold" }}>
                        Select Receiver:
                    </label>
                    <select
                        id="receiversDropdown"
                        value={formData.receiversId}
                        onChange={(e) => setFormData({ ...formData, receiversId: e.target.value })}
                        style={{
                            width: "105%",
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
                            Select Receiver
                        </option>
                        {receivers.map((receiver) => (
                            <option key={receiver.id} value={receiver.id}>
                                {receiver.id} - {receiver.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Textarea for Message */}
                <textarea
                    placeholder="Message"
                    value={formData.notification_Descpirtion}
                    onChange={(e) => setFormData({ ...formData, notification_Descpirtion: e.target.value })}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        fontSize: "16px",
                        resize: "vertical",
                    }}
                    required
                ></textarea>

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
                    Post Notification
                </button>
            </form>
        </div>
    );
};

export default PostNotification;





// import React, { useState } from "react";
// import axios from "axios";

// const API_URL = "https://localhost:7150/api/Notifications";

// const PostNotification = () => {
//     const sendersId = localStorage.getItem('user_id')
//     const [formData, setFormData] = useState({
//         sendersId: sendersId,
//         receiversId: "",
//         notification_Descpirtion: "",
//     });

//     const postNotification = async (e) => {
//         e.preventDefault();
//         if (!formData.sendersId || !formData.receiversId || !formData.notification_Descpirtion.trim()) {
//             alert("All fields are required!");
//             return;
//         }
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post(
//                 API_URL,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Attach the token
//                     },
//                 }
//             ); alert("Notification posted successfully!");
//             setFormData({ sendersId: "", receiversId: "", notification_Descpirtion: "" });
//         } catch (error) {
//             console.error("Error posting notification:", error.message);
//             alert("Failed to post notification. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h3>Post a New Notification</h3>
//             <form onSubmit={postNotification}>
//                 <input
//                     type="text"
//                     placeholder="Receiver ID"
//                     value={formData.receiversId}
//                     onChange={(e) => setFormData({ ...formData, receiversId: e.target.value })}
//                     required
//                 />
//                 <textarea
//                     placeholder="Message"
//                     value={formData.notification_Descpirtion}
//                     onChange={(e) => setFormData({ ...formData, notification_Descpirtion: e.target.value })}
//                     required
//                 ></textarea>
//                 <button type="submit">Post Notification</button>
//             </form>
//         </div>
//     );
// };

// export default PostNotification;
