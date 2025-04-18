import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file
 
const Login = () => {
    const [user_id, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7150/api/Auth/login', {
                user_id,
                password,
            });
            const { token } = response.data;
            console.log("after login" + response.data);
            // Store JWT token in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('Userid', user_id);
           
            // Navigate based on user_id prefix
            if (user_id.startsWith("O")) {
                navigate('/PostProperty');
            } else if (user_id.startsWith("T")) {
                navigate('/GetProperties');
            } else {
                alert('Invalid user type!');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Invalid credentials!');
        }
    };
 
    return (
        <div className="login-container">
            <div className="login-image">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" alt="Login" />
            </div>
            <div className="login-form">
                <h2>Login</h2>
                <p className="info-message">
                    If you are an owner, your ID will start with <strong>O_</strong>. If you are a tenant, your ID will start with <strong>T_</strong>.
                </p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="User_Id"
                        value={user_id}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <a href="#!" className="forgot-password" onClick={() => navigate('/ResetPassword')}>Forgot password?</a>
                   
                    <p>Don't have an Account? <a href="/Reg" className="sign-up">Sign up</a></p>
                </form>
            </div>
        </div>
    );
};
 
export default Login;