const express = require('express');


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ MongoDB Connected to Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// Device Model
const Device = mongoose.model('Device', new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'active' }
}));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Device API! Use /api/devices for device operations.');
});
// Create a new device
app.post('/api/devices', async (req, res) => {
  const { name, type, status } = req.body;
  const newDevice = new Device({ name, type, status });
  await newDevice.save();
  res.status(201).json(newDevice);
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
