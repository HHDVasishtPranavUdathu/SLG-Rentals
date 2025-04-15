import React, { useState } from 'react';

const API_URL = "https://localhost:7150/api/lease";

const GetLeaseById = () => {
    const [leaseId, setLeaseId] = useState('');
    const [lease, setLease] = useState(null);

    const handleSearch = async () => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You are not authenticated. Please log in.');
                return;
            }

            const response = await fetch(`${API_URL}/GetLeaseByLId/${leaseId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setLease(result);
        } catch (error) {
            console.error('Error fetching lease:', error.message);
            alert('Failed to fetch lease.');
        }
    };

    return (
        <div>
            <h3>Get Lease by ID</h3>
            <input
                type="number"
                placeholder="Lease ID"
                value={leaseId}
                onChange={(e) => setLeaseId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {lease && (
                <div>
                    <h4>Lease Details</h4>
                    <pre>{JSON.stringify(lease, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default GetLeaseById;
