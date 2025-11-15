const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  event_id: { type: String, required: true, unique: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  received_timestamp: { type: Date, default: Date.now },
  processed_timestamp: { type: Date },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  received_data: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' }
});

module.exports = mongoose.model('Log', LogSchema);
