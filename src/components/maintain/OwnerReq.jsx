import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://localhost:7150/api/Maintainances/owner";
const Base_URL = "https://localhost:7150/api/Maintainances";
 
const OwnerReq = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(5); // Number of requests per page
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem("user_id");
      console.log(token);
      if (!token) {
        console.log('token did not match');
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
  }, [navigate]);
 
  const handleStatusChange = async (requestId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${Base_URL}/${requestId}`, newStatus.toString(), { // Ensure newStatus is sent as a string
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: "application/json",
        },
      });
      console.log('Update response:', response.data); // Log the update response
 
      // Update the local state
      setRequests(requests.map(rq => rq.requestId === requestId ? { ...rq, status: newStatus } : rq));
      setSelectedRequest(null); // Close the modal
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        alert(`Failed to update status: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Failed to update status: No response from server.');
      } else {
        console.error('Error message:', error.message);
        alert('Failed to update status: ' + error.message);
      }
    }
  };
 
  // Get current requests
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
 
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div className="container">
      <h2>Pending Owner Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Property Id</th>
            <th>Tenant Id</th>
            <th>Description</th>
            <th>Status</th>
            <th>Image (optional)</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((rq) => (
            <tr key={rq.requestId} onClick={() => setSelectedRequest(rq)}>
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
 
      {selectedRequest && (
        <div className="modal">
          <div className="modal-content">
            <h3>Request Details</h3>
            <p><strong>Request Id:</strong> {selectedRequest.requestId}</p>
            <p><strong>Property Id:</strong> {selectedRequest.propertyId}</p>
            <p><strong>Tenant Id:</strong> {selectedRequest.tenantId}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <p><strong>Image Path:</strong> {selectedRequest.imagePath}</p>
            <button onClick={() => handleStatusChange(selectedRequest.requestId, "Approved")}>Approve</button>
            <button onClick={() => handleStatusChange(selectedRequest.requestId, "Rejected")}>Reject</button>
            <button onClick={() => setSelectedRequest(null)}>Close</button>
          </div>
        </div>
      )}
 
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
 
export default OwnerReq;