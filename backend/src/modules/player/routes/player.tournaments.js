const notificationService = require('../../admin/services/notification.service');
const playerTournamentsService = require('../services/player.tournaments.service');

const playerTournamentsRouter = require('express').Router();

playerTournamentsRouter.post('/getAllTournamentsToPlay/:id', playerTournamentsService.getAllTournamentsToPlay);
playerTournamentsRouter.post('/createTournament', [playerTournamentsService.addTournament, playerTournamentsService.addTournamentToPlayerRecord, notificationService.pushNotification]);
playerTournamentsRouter.get('/getTournamentDetails/:tournamentId', playerTournamentsService.getTournamentDetails);
playerTournamentsRouter.post('/submitScore', [playerTournamentsService.submitScore, playerTournamentsService.addTournamentToPlayerRecord]);
playerTournamentsRouter.post('/getAllPlayedTournaments', playerTournamentsService.getAllPlayedTournaments)
module.exports = playerTournamentsRouter;