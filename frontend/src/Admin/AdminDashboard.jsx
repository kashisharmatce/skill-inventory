import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await axios.get('/admin');
      setAdmins(response.data.data);
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/admin/${id}`, {
      headers: {
        'x-header-key': token,
      },
    });
    setAdmins(admins.filter((admin) => admin._id !== id));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            {admin.name} - {admin.email}
            <Link to={`/admin/edit/${admin._id}`}>Edit</Link>
            <button onClick={() => handleDelete(admin._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
