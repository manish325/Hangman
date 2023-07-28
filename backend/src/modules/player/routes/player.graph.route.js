const playerGraphService = require('../services/player-graph.service');

const playerGraphRouter = require('express').Router();

playerGraphRouter.get('/getGraphData', playerGraphService.getPlayerGraphData);
module.exports = playerGraphRouter;