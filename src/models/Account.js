const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const AccountSchema = new mongoose.Schema({
  account_id: { type: String, default: uuidv4, unique: true },
  account_name: { type: String, required: true },
  app_secret_token: { type: String, default: uuidv4 },

  website: { type: String, default: null },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Account', AccountSchema);
