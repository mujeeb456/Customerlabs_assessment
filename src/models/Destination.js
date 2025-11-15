const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },

  url: { type: String, required: true },
  method: { type: String, required: true },

  headers: {
    type: Map,
    of: String,
    required: true
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Destination', DestinationSchema);
