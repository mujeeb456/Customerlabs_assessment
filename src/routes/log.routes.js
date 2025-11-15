const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { requireNormalOrAdmin } = require('../middlewares/roles.middleware');
const { getLogs } = require('../controllers/logController');

router.get('/', auth, requireNormalOrAdmin, getLogs);

module.exports = router;
