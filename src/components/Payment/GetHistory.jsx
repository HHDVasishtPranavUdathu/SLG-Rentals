import React, { useState } from "react";
import "./get.css"

const OwnerTenantHistory = () => {
  const [tenantId, setTenantId] = useState("");
  const [tenantDetails, setTenantDetails] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchHistoryByTenantId = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = `https://localhost:7150/api/History/owner-tenant-history/${tenantId}`;
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Assume username and phone number are always the same; extracted once
      const { tenant_name, tenant_Phonenumber, ...otherDetails } = data[0];
      setTenantDetails({ tenant_name, tenant_Phonenumber });
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setError("Failed to fetch history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHistoryByTenantId();
  };

  return (
    <div className="container">
      <h2>Search Owner-Tenant History</h2>
      {/* Form to input tenant ID */}
      <form onSubmit={handleSubmit}>
        <label>
          Tenant ID:
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading history...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Display tenant details once */}
      {tenantDetails && (
        <div>
          <h3>Tenant Information</h3>
          <p>
            <strong>Username:</strong> {tenantDetails.tenant_name}
            <br />
            <strong>Phone Number:</strong> {tenantDetails.tenant_Phonenumber}
          </p>
        </div>
      )}

      {/* Display history details */}
      {!loading && !error && history.length > 0 && (
        <div>
          <h3>Leased Property History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <strong>Leased Property ID:</strong> {item.leased_property_id}
                <br />
                <strong>Start Time:</strong> {new Date(item.startTime).toLocaleDateString()}
                <br />
                <strong>End Time:</strong> {new Date(item.endTime).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OwnerTenantHistory;
