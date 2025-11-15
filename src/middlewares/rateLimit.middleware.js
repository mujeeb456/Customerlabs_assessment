const rateLimit = require('express-rate-limit');

exports.createAccountRateLimiter = (getKey) =>
  rateLimit({
    windowMs: 1000, 
    max: 5,
    keyGenerator: getKey,
    handler: (req, res) =>
      res.status(429).json({ success: false, message: "Too many requests" })
  });
