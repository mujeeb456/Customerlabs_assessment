const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const { requireAdmin } = require('../middlewares/roles.middleware');
const { createAccount, listAccounts, deleteAccount } = require('../controllers/account.controller');

// Only Admin can create & delete
router.post('/', auth, requireAdmin, createAccount);
router.get('/', auth, listAccounts);
router.delete('/:id', auth, requireAdmin, deleteAccount);

module.exports = router;
