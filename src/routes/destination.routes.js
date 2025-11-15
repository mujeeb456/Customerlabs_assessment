const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { requireNormalOrAdmin, requireAdmin } = require('../middlewares/roles.middleware');
const { createDestination, listByAccount } = require('../controllers/destination.controller');

router.post('/', auth, requireAdmin, createDestination); // Admin creates
router.get('/account/:accountId', auth, requireNormalOrAdmin, listByAccount); // Admin + Normal can read

module.exports = router;
