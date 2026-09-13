const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticate = require('../middleware/authenticate');

router.get('/channel/:channelId', messageController.getMessages);
router.post('/channel/:channelId', authenticate, messageController.sendMessage);

module.exports = router;
