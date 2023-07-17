const playerTournamentsRouter = require('./player.tournaments');

const playerRouter = require('express').Router();

playerRouter.use('/tournaments', playerTournamentsRouter)
module.exports = playerRouter;