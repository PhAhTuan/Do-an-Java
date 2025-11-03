const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => res.send("Server running"));

const port = 5000;
app.listen(port, () => console.log(`Server chạy tại http://localhost:${port}`));
