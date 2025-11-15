require('dotenv').config({
  path: require('path').resolve(__dirname, '..', '..', '.env')
});const sendQueue = require('../services/queue');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Destination = require('../models/Destination');
const Log = require('../models/Log');
const { forwardToDestination } = require('../services/forwarder');

(async () => {
  await connectDB();
  console.log('Worker connected DB');

  sendQueue.process(async (job) => {
    const { accountId, eventId, data, accountMongoId } = job.data;
    const destinations = await Destination.find({ account: accountMongoId });
    for (const dest of destinations) {
      const logEntry = new Log({ event_id: eventId, account: accountMongoId, destination: dest._id, received_data: data, status: 'pending' });
      await logEntry.save();
      try {
        await forwardToDestination(dest, data);
        logEntry.status = 'success';
        logEntry.processed_timestamp = new Date();
        await logEntry.save();
      } catch (err) {
        logEntry.status = 'failed';
        logEntry.processed_timestamp = new Date();
        logEntry.error = err.message;
        await logEntry.save();
      }
    }
  });

  sendQueue.on('failed', (job, err) => {
    console.error('Job failed', err);
  });

  console.log('Worker listening to queue');
})();
