const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
