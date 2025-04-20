import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Banner from '../Banner'; // Import the Banner component
import './PasswordReset.css'; // Import the CSS file

const PasswordReset = () => {
    const [user_id, setUserId] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [bannerMessage, setBannerMessage] = useState(''); // State for banner message
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7150/api/Forget/reset-password', {
                userId: user_id,
                answer,
                newPassword,
            });
            console.log('Response:', response); // Debugging log
            if (response.status === 200 && response.data.message === "Password reset successful!") {
                setIsSuccess(true); // Set success state
                setBannerMessage("Password reset successful!"); // Set banner message
            } else {
                setIsSuccess(false); // Set error state
                setBannerMessage("Password reset failed! Invalid answer or user ID."); // Set banner message
            }
        } catch (error) {
            console.error('Password reset failed:', error.response ? error.response.data : error.message);
            setIsSuccess(false); // Set error state
            setBannerMessage("Password reset failed! Please try again."); // Set banner message
        }
    };

    const closeBanner = () => {
        setBannerMessage(''); // Clear banner message
        if (isSuccess) {
            navigate('/login'); // Navigate to login after closing the banner if successful
        }
    };

    return (
        <div className="password-reset-container">
            {bannerMessage && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Display banner if message exists */}
            <h2>Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
                <label htmlFor="user_id">User ID</label>
                <input
                    type="text"
                    id="user_id"
                    placeholder="User ID"
                    value={user_id}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <label htmlFor="answer">Answer</label>
                <input
                    type="text"
                    id="answer"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
                <label htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordReset;
