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

  

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


 
  // Filter properties based on search input
  const filteredProperties = property.filter(pr => 
    pr.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      
<h4>properties we offer</h4>
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
