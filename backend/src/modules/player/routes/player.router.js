const playerGiftsRouter = require('./player.gifts.route');
const playerGraphRouter = require('./player.graph.route');
const playerTournamentsRouter = require('./player.tournaments');

const playerRouter = require('express').Router();

playerRouter.use('/tournaments', playerTournamentsRouter);
playerRouter.use('/gifts', playerGiftsRouter);
playerRouter.use('/progress', playerGraphRouter)
module.exports = playerRouter;