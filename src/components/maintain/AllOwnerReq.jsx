import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import axios from "axios";
const API_URL = "https://localhost:7150/api/Maintainances/all_owner";
 
const AllOwnerReq = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ owner_Id: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); // Number of requests per page
  const navigate = useNavigate();
 
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
 
  return (
    <div className="container">
      <h2>All Owner Requests</h2>
 
      <table border="1">
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Property Id</th>
            <th>Tenant Id</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image_optional</th>
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
            </tr>
          ))}
        </tbody>
      </table>
 
      <div className="pagination">
        {Array.from({ length: Math.ceil(requests.length / requestsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
 
export default AllOwnerReq;