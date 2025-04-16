import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import Banner from "../Banner";
 
const API_URL = "https://localhost:7150/api/Registrations";
 
// Validation schema
const validationSchema = yup.object({
    id: yup.string().required("ID Should Not Be Null"),
    name: yup.string()
        .min(4, "Name should contain a minimum length of 4 characters")
        .max(30, "Name should not exceed the maximum limit of 30 characters")
        .required("Name is required."),
    phoneNumber: yup.string()
        .matches(/^\d{10}$/, "Phone number should contain exactly 10 digits.")
        .required("PhoneNumber is required."),
    d_O_B: yup.date().required("Date of Birth is required."),
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
                    setBannerMessage(""); // Clear banner message after 6 seconds
                }, 6000);
                setTimeout(() => {
                    navigate("/login"); // Redirect to /login
                    setBannerMessage(""); // Clear banner message
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
        <div>
            {bannerMessage && <Banner message={bannerMessage} onClose={closeBanner} />} {/* Display banner if message exists */}
            <h2 className="text-center">Registration Management</h2>
            <form onSubmit={formik.handleSubmit} className="registration-form">
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
                />
                {formik.touched.id && formik.errors.id ? <div className="error">{formik.errors.id}</div> : null}
               
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
                />
                {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
               
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
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="error">{formik.errors.phoneNumber}</div> : null}
               
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
                />
                {formik.touched.d_O_B && formik.errors.d_O_B ? <div className="error">{formik.errors.d_O_B}</div> : null}
               
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
                />
                {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
               
                <label htmlFor="answer">Answer</label>
                <input
                    type="text"
                    name="answer"
                    id="answer"
                    value={formik.values.answer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Answer"
                    required
                />
                {formik.touched.answer && formik.errors.answer ? <div className="error">{formik.errors.answer}</div> : null}
               
                <label htmlFor="roleofUser">Role of User</label>
                <select
                    name="roleofUser"
                    id="roleofUser"
                    value={formik.values.roleofUser}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="dropdown"
                    required
                >
                    <option value="" label="Select role" />
                    <option value="O" label="O" />
                    <option value="T" label="T" />
                </select>
                {formik.touched.roleofUser && formik.errors.roleofUser ? <div className="error">{formik.errors.roleofUser}</div> : null}
               
                <button type="submit">Register</button>
                <button type="button" onClick={formik.resetForm}>Reset</button>
            </form>
        </div>
    );
};
 
export default RegistrationForm;