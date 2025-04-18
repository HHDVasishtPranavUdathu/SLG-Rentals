import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllProperties.css"; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const API_URL = "https://localhost:7150/api/Properties";

const AllProperties = () => {
  const [property, setProperty] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const propertiesPerPage = 4;

  useEffect(() => {
    if (!userId.startsWith("O")) {
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

  return (
    <div className="container">
      <h4>All the properties we offer:</h4>
        <div className="property-container">
            {currentProperties.map((pr) => (
            <div className="property-card" key={pr.property_Id}>
                <img src="https://tse2.mm.bing.net/th/id/OIP.uIMPvMRhXXG3rGddF6gxFgHaE8?w=1024&h=683&rs=1&pid=ImgDetMain" alt="Property" className="property-image" />
                <div className="property-details">
                <p>proprty at</p>
                <h3>{pr.address}</h3>
                <p>{pr.description}</p>
                <p>Price: {pr.priceOfTheProperty}</p>
                <p>Status: {pr.availableStatus}</p>
                <p>Owner Name: {pr.owner_Name}</p>
                <p>Phone Number: {pr.owner_PhoneNumber}</p>
                <button onClick={() =>navigate('/login')}>apply</button>
                </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(property.length / propertiesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
