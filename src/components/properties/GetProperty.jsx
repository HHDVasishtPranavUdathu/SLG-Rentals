import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GetProperties.css"; // Import the CSS file
import { useNavigate, Link } from 'react-router-dom';
import NotiBtn from "../notification/NotiBtn";

const API_URL = "https://localhost:7150/api/Properties";

const GetProperties = () => {
  const [property, setProperty] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(""); // State for search input
  const navigate = useNavigate();
  const propertiesPerPage = 6; // Number of properties per page

  useEffect(() => {
    if (userId.startsWith("T")) {
      loadProperty();
    }
  }, [userId]);

  const loadProperty = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data); // Log the response data
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      loadProperty(); // Refresh data
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = property.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
  
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login after logout
  };

  // Filter properties based on search input
  const filteredProperties = property.filter(pr => 
    pr.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
        <div className="header-links">
          <Link to="/lease/tenant" className="link-default">Lease</Link>
          <Link to="/GetProperties" className="link-primary">All Properties ↓</Link>
          <NotiBtn/>
          {/* Profile Section with Dropdown */}
          <div className="profile-section" style={{ position: "relative", cursor: "pointer" }}>
            <img
              src="https://github.com/HHDVasishtPranavUdathu/SLG-Rentals/blob/main/src/components/user_12533276.png?raw=true"
              alt="me"
              onMouseEnter={toggleDropdown} 
              style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            />
            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: "60px",
                  right: "0",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: "1000",
                  width: "150px",
                }}
              >
                <Link
                  to="/me"
                  className="dropdown-item"
                  style={{
                    display: "block",
                    padding: "10px",
                    textDecoration: "none",
                    color: "#333",
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() => setIsDropdownVisible(false)} // Close dropdown after clicking
                >
                  My Account
                </Link>
                <button
                  className="dropdown-item"
                  onClick={handleLogout} // Handle logout
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    color: "#333",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by address..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <div className="property-container">
        {filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty).map((pr) => (
          <div className="property-card" key={pr.property_Id}>
            <img src={pr.iimage} alt="Property" className="property-image" />
            <div className="property-details">
              <h3>{pr.address}</h3>
              <p>{pr.description}</p>
              <p>Price: {pr.priceOfTheProperty}</p>
              <p>Status: {pr.availableStatus}</p>
              <p>Owner ID: {pr.owner_Id}</p>
              <p>Owner Name: {pr.owner_Name}</p>
              <p>Phone Number: {pr.owner_PhoneNumber}</p>
              <p>Signature: {pr.owner_Signature}</p>
              <button onClick={() =>navigate('/lease/tenant')}>apply</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProperties.length / propertiesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GetProperties;
