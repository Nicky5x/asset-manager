import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // 1. Create a "State" to hold our assets (starts as an empty array)
  const [assets, setAssets] = useState([]);

  // 2. The "useEffect" hook runs as soon as the page loads
  useEffect(() => {
    fetchAssets();
  }, []);

  // 3. The function that actually calls Backend API
  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/assets');
      setAssets(response.data); // Put the Dell Laptops into our "assets" bucket
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Asset Manager</h1>
      <table border="1" style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {/* 4. Loop through the assets and create a table row for each one */}
          {assets.map((asset) => (
            <tr key={asset.aid}>
              <td>{asset.model}</td>
              <td>{asset.serial_number}</td>
              <td>{asset.status}</td>
              <td>
                {/* Accessing the nested data I set up yesterday! */}
                {asset.Assignments.length > 0 
                  ? `${asset.Assignments[0].Employee.first_name} (${asset.Assignments[0].Department.department_name})`
                  : 'Unassigned'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;