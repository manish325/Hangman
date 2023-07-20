const playerTournamentsService = require('../services/player.tournaments.service');

const playerTournamentsRouter = require('express').Router();

playerTournamentsRouter.post('/getAllTournamentsToPlay/:id', playerTournamentsService.getAllTournamentsToPlay);
playerTournamentsRouter.post('/createTournament', [playerTournamentsService.addTournament, playerTournamentsService.addTournamentToPlayerRecord]);
playerTournamentsRouter.get('/getTournamentDetails/:tournamentId', playerTournamentsService.getTournamentDetails)
module.exports = playerTournamentsRouter;