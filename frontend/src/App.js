import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // 1. Create a "State" to hold our assets (starts as an empty array)
  const [assets, setAssets] = useState([]);
  const [employees, setEmployee] = useState([]);
  // 2. The "useEffect" hook runs as soon as the page loads
  useEffect(() => {
    fetchEmployees();
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

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employee');
      setEmployee(response.data); // Put the employees into bucket  
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

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
      <h2>Employees</h2>
      <table border="1" style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Assigned Assets</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.first_name} {employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.Department?.department_name}</td>
              <td>
       {/* Show Asset if it exists via the Assignment join */}
       {employee.Assignments?.[0]?.Asset?.model || 'Unassigned'}
    </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}

export default App;