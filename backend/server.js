const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); 

// Import Routes
const authRoutes = require("./routes/authRoutes");
const matchRoutes = require("./routes/matchRoutes");
const seekerRoutes = require("./routes/seekerRoutes");
const caregiverRoutes = require("./routes/caregiverRoutes");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/seeker", seekerRoutes);
app.use("/api/caregiver", caregiverRoutes);
app.use("/api", matchRoutes); // matching routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
