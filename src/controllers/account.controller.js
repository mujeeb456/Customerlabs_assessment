// controllers/account.controller.js
const Account = require("../models/Account");
const Role = require("../models/Role");
const AccountMember = require("../models/AccountMember");

exports.createAccount = async (req, res) => {
  try {
    const { account_name, website } = req.body;

    if (!account_name)
      return res.status(400).json({ success: false, message: "Invalid Data" });

    const account = await Account.create({
      account_name,
      website: website || null,
      created_by: req.user._id,
      updated_by: req.user._id
    });

    // Assign creator as Admin Member
    const adminRole = await Role.findOne({ role_name: "Admin" });

    await AccountMember.create({
      account: account._id,
      user: req.user._id,
      role: adminRole._id,
    });

    return res.status(201).json({ success: true, account });
  } catch (err) {
    console.error("createAccount error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listAccounts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.name) {
      filter.account_name = new RegExp(req.query.name, "i");
    }

    const accounts = await Account.find(filter);

    return res.json({ success: true, accounts });
  } catch (err) {
    console.error("listAccounts error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    await Account.findByIdAndDelete(id);

    // Cascading deletions
    const Destination = require("../models/Destination");
    const Log = require("../models/Log");

    await Destination.deleteMany({ account: id });
    await AccountMember.deleteMany({ account: id });
    await Log.deleteMany({ account: id });

    return res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("deleteAccount error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
