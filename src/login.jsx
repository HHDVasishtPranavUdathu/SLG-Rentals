import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [user_id, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const logout = () => {

        localStorage.setItem('token', "XXXX");
        localStorage.setItem('user_id', "XXXX");
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Construct the POST request URL with query parameters
            const url = `https://localhost:7150/api/Registrations/authentication?user_id=${user_id}&password=${encodeURIComponent(password)}`;

            // Send POST request to the API
            const response = await axios.post(url, {}, {
                headers: {
                    'Accept': '*/*', // Ensure proper headers match the curl request
                },
            });

            // Extract token from response body
            const { token } = response.data;

            // Store token in localStorage for future API calls
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_id)

            // Navigate to the notifications dashboard
            navigate('/noti');
        } catch (error) {
            // Enhanced error handling
            if (error.response) {
                console.error('API Error:', error.response.data);
                alert(error.response.data.message || 'Invalid credentials!');
            } else {
                console.error('Network Error:', error.message);
                alert('Failed to connect to the server.');
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', width: '100%' }}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={user_id}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    style={{ marginBottom: '1rem', padding: '0.5rem' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginBottom: '1rem', padding: '0.5rem' }}
                />
                <button type="submit" style={{ margin: '10px', padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Login
                </button>
                <button onClick={logout} style={{ margin: '10px', padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>logout</button>
            </form>
        </div>
    );
};

export default Login;
