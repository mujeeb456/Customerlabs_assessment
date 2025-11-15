const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { requireAdmin } = require('../middlewares/roles.middleware');
const { addMember } = require('../controllers/member.controller');

router.post('/add', auth, requireAdmin, addMember);
module.exports = router;
