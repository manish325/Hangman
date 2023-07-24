const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const tournment = require('../../../models/tournament');
const player = require('../../../models/player');
const score = require('../../../models/score');

class PlayerGiftService {
    async addGiftToPlayerRecords(req, res) {
        //add in format { giftId : string , giftQuantity : number }
        //If gift Id exist, increase gift quantity else add another one
    }
}

module.exports = new PlayerGiftService();