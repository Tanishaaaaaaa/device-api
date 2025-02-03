const mongoose = require('mongoose');

// Define the device schema
const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'active' }
});

// Create the Device model
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
