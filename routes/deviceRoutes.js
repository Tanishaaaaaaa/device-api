const express = require('express');
const Device = require('../models/deviceModel');
const router = express.Router();

// Create a new device (POST)
router.post('/devices', async (req, res) => {
    console.log('Received data:', req.body); 
    try {
        const newDevice = new Device(req.body);
        await newDevice.save();
        res.status(201).json(newDevice); 
    } catch (error) {
        console.error('Error:', error); 
        res.status(400).json({ error: error.message });
    }
});


// Get all devices (GET)
router.get('/devices', async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a device (PUT)
router.put('/devices/:id', async (req, res) => {
    try {
        const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDevice) return res.status(404).json({ error: "Device not found" });
        res.json(updatedDevice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a device (DELETE)
router.delete('/devices/:id', async (req, res) => {
    try {
        const deletedDevice = await Device.findByIdAndDelete(req.params.id);
        if (!deletedDevice) return res.status(404).json({ error: "Device not found" });
        res.json({ message: "Device deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
