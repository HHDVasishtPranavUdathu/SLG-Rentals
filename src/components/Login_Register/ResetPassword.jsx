import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Banner from '../Banner'; // Import the Banner component
import './PasswordReset.css'; // Import the CSS file
import RentalTranslations from '../../RentalTranslations';
import AllProperties from '../properties/AllProperties';

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
                localStorage.removeItem("user_id");
                localStorage.removeItem("token");
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
        <main className="container">
            {bannerMessage && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Display banner if message exists */}
            {/* Header Section */}
            <header className="header">
                <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
                <div className="header-links">
                    <Link to="/login" className="link-default">Login</Link>
                    <Link to="/reg" className="link-default">Register</Link>
                    <a href="#not" className="link-default">See Properties ↓</a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 'calc(100vh - 60px)', paddingTop: '60px' }}>
                <div className="left-side" style={{ flex: 1, padding: '20px' }}>
                    {/* Dynamic Title from RentalTranslations */}
                    <img src="https://github.com/HHDVasishtPranavUdathu/SLG-Rentals/blob/main/src/components/Image%20(1).jpg?raw=true" alt="logo" style={{height: "150px", border:"5px black solid", borderRadius:"50%"}} />
                    <RentalTranslations />
                    <p className="hero-subtitle">
                        Sri Lakshmi Ganapathi Rentals:<br />
                        <b>Not NATIONAL, It's INTERNATIONAL!</b><br />
                        Thaggede Le! 😎
                    </p>
                    <div className="button-group">
                        <a href="#not" className="btn-primary">See Properties ↓</a>
                        <Link to="/reg" className="btn-secondary">Register</Link>
                    </div>
                    <p className="hero-footer">
                        Design Resource trusted by over 1,00,000++ customers 😂🤣
                    </p>
                </div>

                {/* Password Reset Form */}
                <div className="login-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="login-form" style={{ width: '100%', maxWidth: '400px' }}>
                        {/* <h2>Reset Password</h2> */}
                        <form onSubmit={handlePasswordReset} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label htmlFor="user_id">User ID</label>
                            <input
                                type="text"
                                id="user_id"
                                placeholder="User ID"
                                value={user_id}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            <label htmlFor="answer">Answer</label>
                            <input
                                type="text"
                                id="answer"
                                placeholder="Answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset Password</button>
                        </form>
                    </div>
                </div>
            </section>
            <div id="not"><AllProperties/></div>
            <a href="/ResetPassword"><button style={{position: 'fixed', right: '10px', margin:'10px', bottom:'10px',fontSize:"25px" }}>↑</button></a>
        </main>
    );
};

export default PasswordReset;
