import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css'; // Import the CSS file
import RentalTranslations from '../../RentalTranslations';
import AllProperties from '../properties/AllProperties';

const Login = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        user_id: Yup.string().required("User ID is required."),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long.")
            .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one special character, and one number.")
            .required("Password is required.")
    });

    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://localhost:7150/api/Auth/login', values);
                const { token } = response.data;
                console.log("after login" + response.data);
                // Store JWT token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user_id', values.user_id);

                // Navigate based on user_id prefix
                if (values.user_id.startsWith("O")) {
                    navigate('/o');
                } else if (values.user_id.startsWith("T")) {
                    navigate('/t');
                } else {
                    alert('Invalid user type!');
                }
            } catch (error) {
                console.error('Login failed:', error.response ? error.response.data : error.message);
                alert('Invalid credentials!');
            }
        }
    });

    return (
        <main className="container">
            {/* Header Section */}
            <header className="header">
                <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
                <div className="header-links">
                    <Link to="/" className="link-default">Home</Link>
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

                {/* Login Form */}
                <div className="login-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div className="login-form" style={{ width: '100%', maxWidth: '400px' }}>
                        <h2>Login</h2>
                        <p className="info-message">
                            If you are an owner, your ID will start with <strong>O_</strong>. If you are a tenant, your ID will start with <strong>T_</strong>.
                        </p>
                        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input
                                type="text"
                                name="user_id"
                                placeholder="User_Id"
                                value={formik.values.user_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.user_id && formik.errors.user_id ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.user_id}</div>
                            ) : null}
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error" style={{ color: 'red' }}>{formik.errors.password}</div>
                            ) : null}
                            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                            <a href="#!" className="forgot-password" onClick={() => navigate('/ResetPassword')} style={{ color: '#007bff', textDecoration: 'none', marginTop: '10px' }}>Forgot password?</a>
                            <p>Don't have an Account? <a href="/Reg" className="sign-up" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up</a></p>
                        </form>
                    </div>
                </div>
            </section>
                <div id="not"><AllProperties/></div>
        </main>
    );
};

export default Login;
