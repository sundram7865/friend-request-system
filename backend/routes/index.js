const express = require('express');
const authRouter = require('./auth');
const friendRouter = require('./friends');
const userRouter = require('./users');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/friends', friendRouter);
router.use('/users', userRouter);

module.exports = router;