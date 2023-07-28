const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const tournment = require('../../../models/tournament');
const player = require('../../../models/player');
const score = require('../../../models/score');
const playerGiftsService = require('./player.gifts.service');

class PlayerGraphService {
    constructor() {}

    async getPlayerGraphData(req, res) {
        const playerScores = await score.find({playerId : new mongoose.Types.ObjectId(req.userDetails.player.playerId)}).populate('tournamentId');
        const graphData = playerScores.map(PS=>{
            return {
                tournament : PS.tournamentId.tournamentName,
                score : PS.score
            }
        })

        res.status(StatusCodes.OK).json(graphData);
    }
}

module.exports = new PlayerGraphService;