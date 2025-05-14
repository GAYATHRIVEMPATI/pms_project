const express = require('express');
const router = express.Router();
const { createAlert, getAlerts, resolveAlert } = require('../controllers/alertController');

router.post('/', createAlert);
router.get('/', getAlerts);
router.put('/:id/resolve', resolveAlert);

module.exports = router;
