const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/index');

// Define the GET route
router.get('/maintenance', maintenanceController.getAllMaintenanceRecords);

// Define the POST route
router.post('/maintenance', maintenanceController.addMaintenanceRecord);

module.exports = router;
