const express = require('express');
const router = express.Router();
const { saveMessage, getMessages, clearMessages } = require('../controllers/chatController');

router.post('/', saveMessage);
router.get('/', getMessages);
router.delete('/', clearMessages);

module.exports = router;
