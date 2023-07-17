const tournamentService = require('../services/tournament.service');

const tournamentsRouter = require('express').Router();

tournamentsRouter.post('/getAllTournaments', tournamentService.getAllTournaments)
module.exports = tournamentsRouter