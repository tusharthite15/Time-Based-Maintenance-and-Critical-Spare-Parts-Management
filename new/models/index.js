// models/index.js
const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  machine_id: { type: String, required: true },
  model: { type: String, required: true },
  service_interval_days: { type: Number, required: true },
  last_maintenance_date: { type: Date, required: true },
  critical_spare_parts: { type: [String], default: [] },
  log_id: { type: String, required: true },
  maintenance_date: { type: Date, required: true },
  technician_name: { type: String, required: true },
  parts_replaced: { type: [String], default: [] },
  next_maintenance_date: { type: Date, required: true },
  part_id: { type: String, required: true },
  part_name: { type: String, required: true },
  stock_level: { type: Number, required: true },
  reorder_threshold: { type: Number, required: true },
  last_restock_date: { type: Date },
  estimated_restock_date: { type: Date }
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;

// const mongoose = require("mongoose");

// const maintenanceSchema = new mongoose.Schema({
//   machine_id: Number,
//   model: String,
//   service_interval_days: Number,
//   last_maintenance_date: Date, // Use Date type
//   critical_spare_parts: String,
//   log_id: Number,
//   maintenance_date: Date, // Use Date type
//   technician_name: String,
//   parts_replaced: String,
//   next_maintenance_date: Date, // Use Date type
//   part_id: Number,
//   part_name: String,
//   stock_level: Number,
//   reorder_threshold: Number,
//   last_restock_date: Date, // Use Date type
//   estimated_restock_date: Date, // Use Date type
  
//   // Newly added fields for additional maintenance dates
//   past_maintenance_date_1: Date,
//   past_maintenance_date_2: Date,
//   past_maintenance_date_3: Date,
//   fourth_maintenance_date: Date, // Predicted next maintenance date
// });

module.exports = mongoose.model("Maintenance", maintenanceSchema);
