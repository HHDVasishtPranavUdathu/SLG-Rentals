import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css'; // Import the CSS file

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
        <div className="login-container">
            <div className="login-image">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" alt="Login" />
            </div>
            <div className="login-form">
                <h2>Login</h2>
                <p className="info-message">
                    If you are an owner, your ID will start with <strong>O_</strong>. If you are a tenant, your ID will start with <strong>T_</strong>.
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="user_id"
                        placeholder="User_Id"
                        value={formik.values.user_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.user_id && formik.errors.user_id ? (
                        <div className="error">{formik.errors.user_id}</div>
                    ) : null}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}
                    <button type="submit">Login</button>
                    <a href="#!" className="forgot-password" onClick={() => navigate('/ResetPassword')}>Forgot password?</a>
                    <p>Don't have an Account? <a href="/Reg" className="sign-up">Sign up</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
