// models/AccountMember.js
const mongoose = require('mongoose');

const AccountMemberSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
});

module.exports = mongoose.model('AccountMember', AccountMemberSchema);
