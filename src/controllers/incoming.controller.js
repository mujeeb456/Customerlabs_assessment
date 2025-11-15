const Account = require('../models/Account');
const Log = require('../models/Log');
const sendQueue = require('../services/queue');

exports.receiveData = async (req, res) => {
  try {
    const token = req.header('CL-X-TOKEN');
    const eventId = req.header('CL-X-EVENT-ID');

    if (!token || !eventId)
      return res.status(400).json({ success: false, message: "Invalid Data" });

    const account = await Account.findOne({ app_secret_token: token });
    if (!account)
      return res.status(404).json({ success: false, message: "Account not found" });

    const exists = await Log.findOne({ event_id: eventId });
    if (exists)
      return res.status(400).json({ success: false, message: "Event ID already exists" });

    await Log.create({
      event_id: eventId,
      account: account._id,
      received_data: req.body,
      status: "pending",
      received_timestamp: new Date()
    });

    await sendQueue.add({
      accountId: account.account_id,
      accountMongoId: account._id,
      eventId,
      data: req.body
    });

    return res.json({ success: true, message: "Data Received" });
  } catch (err) {
    console.error("receiveData error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
