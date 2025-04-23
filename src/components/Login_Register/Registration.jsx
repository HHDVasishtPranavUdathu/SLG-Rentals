import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import './Registration.css';
import Banner from "../Banner"; 
import { useNavigate,Link } from 'react-router-dom';
import RentalTranslations from "../../RentalTranslations";
import Login from "./login";
import AllProperties from "../properties/AllProperties";
 
const API_URL = "https://localhost:7150/api/Registrations";
 
// Validation schema
const validationSchema = yup.object({
    id: yup.string()
        .matches(/^\d+$/, "ID should contain only digits.")
        .required("ID Should Not Be Null"),
    name: yup.string()
        .matches(/^(?=.*[A-Z])[A-Za-z]+$/, "Name should contain only alphabets with at least one uppercase letter.")
        .min(4, "Name should contain a minimum length of 4 characters")
        .max(30, "Name should not exceed the maximum limit of 30 characters")
        .required("Name is required."),
    phoneNumber: yup.string()
        .matches(/^\d{10}$/, "Phone number should contain exactly 10 digits.")
        .required("PhoneNumber is required."),
    d_O_B: yup.date()
    .max(new Date(), "Date of Birth must be in the past.")
    .required("Date of Birth is required."),
    password: yup.string()
        .min(6, "Password must be at least 6 characters long.")
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/, "Password must contain at least one uppercase letter, one special character, and one number.")
        .required("Password is required."),
    answer: yup.string().required("Answer is required."),
    signature: yup.string(),
    roleofUser: yup.string().required("Role of User is required.")
});
 
 
 
const RegistrationForm = () => {
    const [registrations, setRegistrations] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [bannerMessage, setBannerMessage] = useState(""); // State for banner message
    const navigate = useNavigate();
 
    useEffect(() => {
        loadRegistrations();
    }, []);
 
    const loadRegistrations = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log("Fetched registrations:", response.data); // Debugging log
            setRegistrations(response.data);
        } catch (error) {
            console.error("Error fetching registrations:", error);
        }
    };
 
    const formatDate = (date) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${month}-${day}-${year}`;
    };
 
    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            phoneNumber: "",
            d_O_B: "",
            password: "",
            answer: "",
            signature: "123",
            roleofUser: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const [year, month, day] = values.d_O_B.split("-");
                const formattedDate = `${month}-${day}-${year}`; // Change to MM-DD-YYYY format
 
                const addUrl = `${API_URL}?id=${values.id}&name=${values.name}&phonenumber=${values.phoneNumber}&role=${values.roleofUser}&dob=${formattedDate}&password=${values.password}&answer=${values.answer}&signature=${values.signature}`;
                console.log("Adding registration with URL:", addUrl); // Debugging log
 
                await axios.post(addUrl); // Send POST request
                loadRegistrations(); // Refresh data after addition
                resetForm(); // Clear form after adding
                setBannerMessage("User registered successfully!"); // Show success message
                setTimeout(() => {
                    setBannerMessage("");
                    navigate('/login')
                }, 6000);
               
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    setBannerMessage("User already exists!"); // Show user already exists message
                    setTimeout(() => {
                        setBannerMessage(""); // Clear banner message after 6 seconds
                    }, 6000);
                } else {
                    console.error("Error adding registration:", error.response || error.message);
                }
            }
        }
    });
 
    const toggleTableVisibility = () => {
        setShowTable(!showTable);
    };
 
    const closeBanner = () => {
        setBannerMessage(""); // Clear banner message
    };
    return (
        <main className="container">
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
                        <a href="/login" className="btn-primary">LOGIN ↓</a>
                        {/* <Link to="/reg" className="btn-secondary">Register</Link> */}
                    </div>
                    <p className="hero-footer">
                        Design Resource trusted by over 1,00,000++ customers 😂🤣
                    </p>
                </div>
    
                {/* Registration Form */}
                <div className="registration-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px', overflowY: 'auto', maxHeight: '70vh' }}>
                    {bannerMessage && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Display banner if message exists */}
                    <div className="registration-form" style={{ width: '100%', maxWidth: '400px' }}>
                        <h2 style={{ textAlign: 'center' }}>Registration</h2>
                        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label htmlFor="id">ID</label>
                            <input
                                type="text"
                                name="id"
                                id="id"
                                value={formik.values.id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="ID"
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.id && formik.errors.id ? <div className="error" style={{ color: 'red' }}>{formik.errors.id}</div> : null}
    
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Name"
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.name && formik.errors.name ? <div className="error" style={{ color: 'red' }}>{formik.errors.name}</div> : null}
    
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Phone Number"
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="error" style={{ color: 'red' }}>{formik.errors.phoneNumber}</div> : null}
    
                            <label htmlFor="d_O_B">Date of Birth</label>
                            <input
                                type="date"
                                name="d_O_B"
                                id="d_O_B"
                                value={formik.values.d_O_B}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Date of Birth"
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.d_O_B && formik.errors.d_O_B ? <div className="error" style={{ color: 'red' }}>{formik.errors.d_O_B}</div> : null}
    
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Password"
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.password && formik.errors.password ? <div className="error" style={{ color: 'red' }}>{formik.errors.password}</div> : null}
    
                            <label htmlFor="answer">Name of Your Primary School</label>
                            <input
                                type="text"
                                name="answer"
                                id="answer"
                                value={formik.values.answer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Answer"
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {formik.touched.answer && formik.errors.answer ? <div className="error" style={{ color: 'red' }}>{formik.errors.answer}</div> : null}
    
                            <label htmlFor="roleofUser">Role of User</label>
                            <select
                                name="roleofUser"
                                id="roleofUser"
                                value={formik.values.roleofUser}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="dropdown"
                                required
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            >
                                <option value="" label="Select role" />
                                <option value="o" label="Owner" />
                                <option value="t" label="Tenant" />
                            </select>
                            {formik.touched.roleofUser && formik.errors.roleofUser ? <div className="error" style={{ color: 'red' }}>{formik.errors.roleofUser}</div> : null}
    
                            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
                            <button type="button" onClick={formik.resetForm} style={{ backgroundColor: '#6c757d', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset</button>
                        </form>
                    </div>
                </div>
            </section>
            {/* <div id="not"><AllProperties/></div> */}
            
        </main>
    );
    
    
};
 
export default RegistrationForm;