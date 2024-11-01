// server.js
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./api/index"); 
const maintenanceRoutes = require("./routes/index");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Database Connection
connectToDatabase(); 

// Routes
app.use("/api", maintenanceRoutes); // Prefix all maintenance routes with `/api`

// Start Server
const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
