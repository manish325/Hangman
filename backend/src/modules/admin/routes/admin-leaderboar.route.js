const leaderBoardService = require('../services/leaderBoard.service');
const leaderBoardRouter = require('express').Router();

leaderBoardRouter.post('/getLeaderboardData', leaderBoardService.getLeaderboard);
module.exports = leaderBoardRouter