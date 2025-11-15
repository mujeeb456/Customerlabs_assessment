const Queue = require('bull');
const redisUrl = process.env.REDIS_URL;
const sendQueue = new Queue('sendQueue', redisUrl);
module.exports = sendQueue;
