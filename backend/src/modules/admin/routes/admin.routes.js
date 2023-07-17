const leaderBoardRouter = require('./admin-leaderboar.route');
const categoriesRouter = require('./categories.route');
const giftsRouter = require('./gifts.routes');
const playersRouter = require('./players.routes');
const tournamentsRouter = require('./tournaments.routes');
const adminRouter = require('express').Router();


adminRouter.use('/leaderboard', leaderBoardRouter),
adminRouter.use('/categories', categoriesRouter),
adminRouter.use('/tournaments', tournamentsRouter),
adminRouter.use('/gifts', giftsRouter),
adminRouter.use('/players', playersRouter)
module.exports = adminRouter;