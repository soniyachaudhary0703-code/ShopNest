
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/Db");
const authRoutes = require("./routes/AuthRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "ShopNest Backend is running!",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});