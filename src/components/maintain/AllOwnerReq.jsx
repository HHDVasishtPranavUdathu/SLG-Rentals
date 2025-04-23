import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import axios from "axios";
import NotiBtn from "../notification/NotiBtn";
const API_URL = "https://localhost:7150/api/Maintainances/all_owner";

const AllOwnerReq = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ owner_Id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); // Number of requests per page
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to manage dropdown visibility
  
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login after logout
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem("user_id");
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        console.log('Response data:', response.data); // Log the response data

        // Assuming response.data is an array of requests
        setRequests(response.data);
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };

    fetchUserData();
  }, [navigate, formData.owner_Id]);

  // Get current requests
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle view details button click
  const viewDetails = (requestId) => {
    navigate(`/request-details/${requestId}`);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-title">Sri Lakshmi Ganapathi Rentals</div>
        <div className="header-links">
          <Link to="/lease/owner" className="link-default">Lease</Link>
          <Link to="/PostProperties" className="link-primary">All Properties ↓</Link>
          <NotiBtn />
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
      <h2>All Owner Requests</h2>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Property Id</th>
            <th>Tenant Id</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image_optional</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((rq) => (
            <tr key={rq.requestId}>
              <td>{rq.requestId}</td>
              <td>{rq.propertyId}</td>
              <td>{rq.tenantId}</td>
              <td>{rq.description}</td>
              <td>{rq.status}</td>
              <td>{rq.imagePath}</td>
              <td>
                <button onClick={() => viewDetails(rq.requestId)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px' }}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: Math.ceil(requests.length / requestsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '3px', margin: '0 5px' }}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllOwnerReq;
