const Log = require('../models/Log');
const Account = require('../models/Account');

exports.getLogs = async (req, res) => {
  try {
    const { event_id, account_id, status, destination_id } = req.query;

    const filter = {};

    if (event_id) filter.event_id = event_id;

    if (status) filter.status = status;

    if (destination_id) filter.destination = destination_id;

    if (account_id) {
      const account = await Account.findOne({ account_id });
      if (!account)
        return res.status(404).json({ success: false, message: "Account not found" });
      filter.account = account._id;
    }

    const logs = await Log.find(filter)
      .populate("account", "account_id account_name")
      .populate("destination", "url method");

    return res.json({ success: true, logs });

  } catch (err) {
    console.error("getLogs error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
