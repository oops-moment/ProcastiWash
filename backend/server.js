const express = require("express");
const connectDB = require("./connect"); // Correctly import the MongoDB connection
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user"); // User model

const app = express();
const PORT = 5001; // Use any preferred port
const JWT_SECRET = "your_jwt_secret_key"; // Replace with a secure key

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("wookie Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process if DB connection fails
  });

// API to handle login
app.post("/login", async (req, res) => {
  const { credentialResponse } = req.body;

  try {
    // Validate Google credentials (mock implementation for now)
    const userEmail = credentialResponse.email || "mock_email@example.com"; // Replace with real Google API validation

    // Check if the user exists
    let user = await User.findOne({ email: userEmail });

    // If not, create a new user
    if (!user) {
      user = new User({ email: userEmail });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});