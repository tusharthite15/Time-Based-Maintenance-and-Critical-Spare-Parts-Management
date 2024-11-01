import React, { useState } from 'react';
import axios from 'axios';
import './AddOrUpdateMaintenance.css';

const AddOrUpdateMaintenance = () => {
  const [form, setForm] = useState({
    machine_id: '',
    model: '',
    next_maintenance_date: '',
    technician_name: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/maintenance', form);
      console.log("Maintenance record saved:", response.data);
      alert('Maintenance record saved successfully');
    } catch (error) {
      console.error("Error saving maintenance record:", error);
    }
  };
  
  
  

  return (
    <div className="maintenance-container">
      <h1 className="title">Add or Update Maintenance</h1>
      <form onSubmit={handleSubmit} className="maintenance-form">
        <div className="form-group">
          <label>Machine ID</label>
          <input
            type="number"
            name="machine_id"
            value={form.machine_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Next Maintenance Date</label>
          <input
            type="date"
            name="next_maintenance_date"
            value={form.next_maintenance_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Technician Name</label>
          <input
            type="text"
            name="technician_name"
            value={form.technician_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Save Maintenance</button>
      </form>
    </div>
  );
};

export default AddOrUpdateMaintenance;
