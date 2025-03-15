import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTools, FaSearch, FaCalendarAlt, FaCog, FaExclamationTriangle } from 'react-icons/fa';
import { Menu } from '@headlessui/react';
import Modal from 'react-modal';
import './Dashboard.css';

const Dashboard = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/maintenance');
        setMaintenanceData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenanceData();
  }, []);

  useEffect(() => {
    setFilteredData(
      maintenanceData.filter(data => 
        (typeof data.model === 'string' && data.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof data.part_name === 'string' && data.part_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof data.technician_name === 'string' && data.technician_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof data.critical_spare_parts === 'string' && data.critical_spare_parts.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (typeof data.maintenance_date === 'string' && data.maintenance_date.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, maintenanceData]);

  const openModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const openUpdateModal = (record) => {
    setSelectedRecord(record);
    setFormData(record);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setFormData({});
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/maintenance/${selectedRecord.machine_id}`, formData);
      const response = await axios.get('http://localhost:5000/api/maintenance');
      setMaintenanceData(response.data);
      setFilteredData(response.data);
      closeUpdateModal();
    } catch (error) {
      console.error("Error updating maintenance record:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Maintenance Dashboard</h1>
          <Menu as="div" className="options-menu">
            <Menu.Button className="options-button">
              Options <FaTools className="menu-icon" />
            </Menu.Button>
            <Menu.Items className="menu-items">
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={`menu-item ${active ? 'active' : ''}`}>
                    Export Data
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="/maintenance" className={`menu-item ${active ? 'active' : ''}`}>
                    Add New Maintenance
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={`menu-item ${active ? 'active' : ''}`}>
                    Settings
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </header>

        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search by Machine ID, Model, Technician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="status-section">
          <div className="status-card total-machines">
            <FaCog className="status-icon" />
            <h3>Total Machines</h3>
            <p>{maintenanceData.length}</p>
          </div>
          <div className="status-card upcoming-maintenance">
            <FaCalendarAlt className="status-icon" />
            <h3>Upcoming Maintenance</h3>
            <p>
              {filteredData.filter(data => 
                data.next_maintenance_date && 
                new Date(data.next_maintenance_date) > new Date()
              ).length}
            </p>
          </div>
          <div className="status-card overdue-maintenance">
            <FaExclamationTriangle className="status-icon" />
            <h3>Overdue Maintenance</h3>
            <p>
              {filteredData.filter(data => 
                data.next_maintenance_date && 
                new Date(data.next_maintenance_date) < new Date()
              ).length}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Machine ID</th>
                  <th>Model</th>
                  <th>Next Maintenance Date</th>
                  <th>Technician Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data) => (
                  <tr key={data._id} className="data-row" onClick={() => openModal(data)}>
                    <td>{data.machine_id}</td>
                    <td>{data.model}</td>
                    <td>{data.next_maintenance_date}</td>
                    <td>{data.technician_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
<Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Maintenance Record Details"
  className="modal"
  overlayClassName="modal-overlay"
>
  {selectedRecord && (
    <div className="modal-content">
      <button onClick={closeModal} className="close-modal-btn">&times;</button>
      <h2>Maintenance Record Details</h2>
      <div className="modal-details">
        {/* First section */}
        <div className="modal-section">
          <p><strong>Machine ID:</strong> {selectedRecord.machine_id}</p>
          <p><strong>Model:</strong> {selectedRecord.model}</p>
          <p><strong>Service Interval Days:</strong> {selectedRecord.service_interval_days}</p>
          <p><strong>Last Maintenance Date:</strong> {new Date(selectedRecord.last_maintenance_date).toLocaleDateString()}</p>
          <p><strong>Critical Spare Parts:</strong> {selectedRecord.critical_spare_parts.join(', ')}</p>
          <p><strong>Log ID:</strong> {selectedRecord.log_id}</p>
          <p><strong>Maintenance Date:</strong> {new Date(selectedRecord.maintenance_date).toLocaleDateString()}</p>
        </div>
        {/* Second section */}
        <div className="modal-section">
          <p><strong>Technician Name:</strong> {selectedRecord.technician_name}</p>
          <p><strong>Parts Replaced:</strong> {selectedRecord.parts_replaced.join(', ')}</p>
          <p><strong>Next Maintenance Date:</strong> {new Date(selectedRecord.next_maintenance_date).toLocaleDateString()}</p>
          <p><strong>Part ID:</strong> {selectedRecord.part_id}</p>
          <p><strong>Part Name:</strong> {selectedRecord.part_name}</p>
          <p><strong>Stock Level:</strong> {selectedRecord.stock_level}</p>
          <p><strong>Reorder Threshold:</strong> {selectedRecord.reorder_threshold}</p>
          <p><strong>Last Restock Date:</strong> {selectedRecord.last_restock_date ? new Date(selectedRecord.last_restock_date).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Estimated Restock Date:</strong> {selectedRecord.estimated_restock_date ? new Date(selectedRecord.estimated_restock_date).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
      {/* Update Information button */}
      <button onClick={() => openUpdateModal(selectedRecord)} className="update-btn">
  Update Maintenance
</button>
    </div>
  )}
  </Modal>
          {/* Update Modal */}
          <Modal
            isOpen={isUpdateModalOpen}
            onRequestClose={closeUpdateModal}
            contentLabel="Update Maintenance Record"
            className="modal-update"
            overlayClassName="modal-overlay"
          >
            {selectedRecord && (
              <div className="modal-content-update">
                <button onClick={closeUpdateModal} className="close-modal-btn">&times;</button>
                <h2>Update Maintenance Record</h2>
                <form className="update-form" onSubmit={handleUpdateSubmit}>
                  <div>
                    <label>Machine ID:</label>
                    <input type="text" name="machine_id" value={formData.machine_id || ''} onChange={handleUpdateChange} />
                  </div>
                  <div>
                    <label>Model:</label>
                    <input type="text" name="model" value={formData.model || ''} onChange={handleUpdateChange} />
                  </div>
                  <div>
                    <label>Service Interval Days:</label>
                    <input type="number" name="service_interval_days" value={formData.service_interval_days || ''} onChange={handleUpdateChange} />
                  </div>
                  <div>
                    <label>Maintenance Date</label>
                    <input type="text" name="maintenance_date" value={formData.maintenance_date || ''} onChange={handleUpdateChange} />
                  </div>
                  <div>
                    <label>Next Maintenance Date:</label>
                    <input type="text" name="next_maintenance_date" value={formData.next_maintenance_date || ''} onChange={handleUpdateChange} />
                  </div>
                  <div>
                    <label>Parts Replaced</label>
                    <input type="text" name="parts_rexplaced" value={formData.parts_replaced || ''} onChange={handleUpdateChange} />
                  </div>
                  {/* Add more fields here as needed */}
                  <button className="update-submit-btn"type="submit">Save Changes</button>
                </form>
              </div>
            )}
          </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
