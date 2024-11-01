const Maintenance = require("../models/index");

// GET handler for all maintenance records
exports.getAllMaintenanceRecords = async (req, res) => {
  // console.log("Received GET request for maintenance records."); 
  try {
    const maintenanceData = await Maintenance.find();
    // console.log("Data retrieved from DB:", maintenanceData); // Debug
    res.status(200).json(maintenanceData);
  } catch (error) {
    console.error("Error in route:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }

};




exports.addMaintenanceRecord = async (req, res) => {
  try {
    const newRecord = new Maintenance(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Error adding maintenance record:", error);
    res.status(500).json({ message: "Error adding maintenance record", error });
  }
};
