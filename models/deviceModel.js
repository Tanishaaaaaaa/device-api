const mongoose = require('mongoose');

// schema definition
const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'active' }
});


const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
