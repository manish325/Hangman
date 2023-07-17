const playerTournamentsService = require('../services/player.tournaments.service');

const playerTournamentsRouter = require('express').Router();

playerTournamentsRouter.get('/getAllTournamentsToPlay/:id', playerTournamentsService.getAllTournamentsToPlay);
playerTournamentsRouter.post('/createTournament', [playerTournamentsService.addTournament, playerTournamentsService.addTournamentToPlayerRecord])
module.exports = playerTournamentsRouter;