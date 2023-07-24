const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const tournment = require('../../../models/tournament');
const player = require('../../../models/player');
const score = require('../../../models/score');


class PlayerCoinService {
    constructor() {}

    async addCoinsToPlayerRecord(req, res, next) {
        const coinsToAdd = req.score / 10;
        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(req.userDetails.player)});
        await Player.updateOne({
            earnedCoins  : Player.earnedCoins + coinsToAdd
        })
        next();
    }
}

module.exports = new PlayerCoinService()