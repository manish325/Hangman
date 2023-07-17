const authService = require('../../auth/services/auth.service');
const playerService = require('../services/player.service');

const playersRouter = require('express').Router();
playersRouter.post('/getAllPlayers', playerService.getAllPlayers)
playersRouter.post('/addPlayer', playerService.addPlayer);
playersRouter.delete('/changePlayerStatus/:id', [ authService.changeUserStatus, playerService.changePlayerStatus])
module.exports = playersRouter