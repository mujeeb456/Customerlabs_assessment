const Destination = require('../models/Destination');
const Account = require('../models/Account');

exports.createDestination = async (req, res) => {
  try {
    const { account_id, url, method, headers } = req.body;

    if (!account_id || !url || !method || !headers)
      return res.status(400).json({ success: false, message: "Invalid Data" });

    const account = await Account.findOne({ account_id });
    if (!account)
      return res.status(404).json({ success: false, message: "Account not found" });

    const destination = await Destination.create({
      account: account._id,
      url,
      method,
      headers,
      created_by: req.user._id,
      updated_by: req.user._id
    });

    return res.status(201).json({ success: true, destination });
  } catch (err) {
    console.error("createDestination error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.listByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;

    const account = await Account.findOne({ account_id: accountId });
    if (!account)
      return res.status(404).json({ success: false, message: "Account not found" });

    const destinations = await Destination.find({ account: account._id });

    return res.json({ success: true, destinations });
  } catch (err) {
    console.error("listByAccount error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
