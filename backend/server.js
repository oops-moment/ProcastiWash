const express = require("express");
const connectDB = require("./connect"); // Correctly import the MongoDB connection
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/user"); // User model
const mongoose = require("mongoose");

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

  const jwt = require("jsonwebtoken"); // Already imported
  const { OAuth2Client } = require("google-auth-library"); // Import Google library
  
  const client = new OAuth2Client("816660941445-1ekbdqbdlu2ive7v4vhijgkuier6pvf4.apps.googleusercontent.com"); // Replace with your client ID
  
  app.post("/login", async (req, res) => {
    const { credentialResponse } = req.body;
  
    try {
      // Verify Google token
      const ticket = await client.verifyIdToken({
        idToken: credentialResponse.credential,
        audience: "816660941445-1ekbdqbdlu2ive7v4vhijgkuier6pvf4.apps.googleusercontent.com", // Replace with your client ID
      });
  
      const payload = ticket.getPayload();
      const userEmail = payload.email;
  
      let user = await User.findOne({ email: userEmail });
      if (!user) {
        user = new User({ email: userEmail });
        await user.save();
      }
  
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
  
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Login failed. Please try again." });
    }
  });





// Machine schema
const machineSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, default: "unoccupied" },
  details: { type: Object, default: null },
});

const Machine = mongoose.model("Machine", machineSchema);

// API routes
app.get("/machines", async (req, res) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    console.error("Error fetching machines:", error);
    res.status(500).json({ message: "Error fetching machines" });
  }
});

app.post("/machines/:id/occupy", async (req, res) => {
  const { id } = req.params;
  const { name, contact, time } = req.body;

  try {
    await Machine.findOneAndUpdate(
      { id },
      { status: "occupied", details: { name, contact, time } },
      { new: true }
    );
    res.status(200).json({ message: "Machine occupied successfully" });
  } catch (error) {
    console.error("Error updating machine status:", error);
    res.status(500).json({ message: "Error updating machine status" });
  }
});

app.post("/machines/:id/free", async (req, res) => {
  const { id } = req.params;

  try {
    await Machine.findOneAndUpdate(
      { id },
      { status: "unoccupied", details: null },
      { new: true }
    );
    res.status(200).json({ message: "Machine freed successfully" });
  } catch (error) {
    console.error("Error updating machine status:", error);
    res.status(500).json({ message: "Error updating machine status" });
  }
});

// Seed initial machines (run only once)
const seedMachines = async () => {
  const initialMachines = [
    { id: 1, name: "Machine Floor 1" },
    { id: 2, name: "Machine Floor 2" },
    { id: 3, name: "Machine Floor 3" },
    { id: 4, name: "Machine Floor 4" },
  ];
  try {
    await Machine.insertMany(initialMachines);
    console.log("Machines seeded successfully");
  } catch (error) {
    console.error("Error seeding machines:", error);
  }
};

// Uncomment the following line to seed machines initially
// seedMachines();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});