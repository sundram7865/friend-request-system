const express = require('express');
const friendController = require('../controllers/friends');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

router.post('/requests', friendController.sendFriendRequest);
router.patch('/requests/:requestId', friendController.respondToRequest);

module.exports = router;