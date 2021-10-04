const router = require('express').Router();
const playersRouter = require('./players.routes');
const staffRouter = require('./staff.routes');


router.use('/players', playersRouter);
router.use('/staff', staffRouter)

module.exports = router;