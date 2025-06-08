require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
  origin: 'https://software-frontend-woad.vercel.app', // your frontend's Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // only if you use cookies or auth headers
}));
 // This allows cross-origin requests from your frontend

// Middleware
app.use(express.json()); // To parse JSON bodies in POST requests

// Routes
app.use("/api", contactRoutes); // Your contact routes, mapped to /api

// MongoDB connection & start server
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Mongo URI:", process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Start server after DB connection is successful
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
