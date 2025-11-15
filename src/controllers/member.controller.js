const Account = require('../models/Account');
const User = require('../models/User');
const Role = require('../models/Role');
const AccountMember = require('../models/AccountMember');

exports.addMember = async (req, res) => {
  const { accountId, userEmail, roleName } = req.body;
  const account = await Account.findOne({ account_id: accountId });
  if (!account) return res.status(404).json({ success: false, message: 'Account not found' });
  const user = await User.findOne({ email: userEmail });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const role = await Role.findOne({ role_name: roleName });
  if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
  const member = await AccountMember.create({ account: account._id, user: user._id, role: role._id });
  res.json({ success: true, member });
};
