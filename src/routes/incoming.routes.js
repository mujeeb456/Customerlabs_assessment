// routes/incoming.routes.js
const router = require('express').Router();
const { receiveData } = require('../controllers/incoming.controller');
const { incomingValidator } = require('../utils/validators');
const { validationResult } = require('express-validator');
const { createAccountRateLimiter } = require('../middlewares/rateLimit.middleware');

const limiter = createAccountRateLimiter((req) => req.header("CL-X-TOKEN"));

router.post(
  '/incoming_data',
  incomingValidator,
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty())
      return res.status(400).json({ success: false, message: "Invalid Data" });
    next();
  },
  limiter,
  receiveData
);

module.exports = router;
