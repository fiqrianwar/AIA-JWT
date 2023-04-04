const express = require('express'),
    router = express.Router(),
    userRouter = require('./user'),
    categoryRouter = require('./category')

router.use('/user', userRouter);
router.use('/category', categoryRouter);

module.exports = router