const express = require('express');
const mongoose = require('mongoose');  // Add this to import mongoose


const app = express();

app.use(express.json());
require('dotenv').config(); 
// MongoDB connection
//mongoose.connect('mongodb://localhost:27017/devicesDB', { useNewUrlParser: true, useUnifiedTopology: true })
//  .then(() => console.log("MongoDB Connected"))
//  .catch(err => console.log(err));
// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/devicesDB'; // For local use
mongoose.set("strictQuery", false);

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if DNS fails
  family: 4 // Force IPv4 for DNS resolution
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
// Device Model
const Device = mongoose.model('Device', new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'active' }
}));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Device API! This is my first assignments');
});
// Create a new device
app.post('/api/devices', async (req, res) => {
  const { name, type, status } = req.body;
  const newDevice = new Device({ name, type, status });
  
  try {
    await newDevice.save();  // Save the new device to MongoDB
    res.status(201).json(newDevice);  // Return the new device in the response
  } catch (err) {
    console.error("Error saving device:", err);  // Log any errors
    res.status(500).json({ message: 'Error saving device to database' });  // Send error response
  }
});


// Get all devices
app.get('/api/devices', async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

// Update device details
app.put('/api/devices/:id', async (req, res) => {
  const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!device) return res.status(404).json({ message: "Device not found" });
  res.json(device);
});

// Delete a device
app.delete('/api/devices/:id', async (req, res) => {
  const device = await Device.findByIdAndDelete(req.params.id);
  if (!device) return res.status(404).json({ message: "Device not found" });
  res.json({ message: "Device deleted successfully" });
});

// Start the server
app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
