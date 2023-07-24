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
        res.send(
            '<h1>Route Working Fine</h1>')
    }
}

module.exports = new PlayerGraphService;