const {StatusCodes} = require('http-status-codes');
const player = require('../../../models/player');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const user = require('../../../models/user.model');
const roles = require('../../../core/constants');
const authService = require('../../auth/services/auth.service');


class PlayerService {

    constructor(){  }

    async getAllPlayers(req, res) {
        const { searchText , pageSize , pageNumber , status, sortManner} = req.body;
        const paginatedData = (pageNumber) * pageSize;
        const query = {
            isActive : status,
            roles : {
                $in : [roles.player]
            }
        }
        if(searchText) {
            query.username = {
                $regex: new RegExp(searchText, 'i')
            }
        }
        const userPlayers = await user.find(query).skip(paginatedData).sort({username : sortManner}).populate('player');
        const totalPlayers = userPlayers.length;
        const players = userPlayers.map((P)=>{
            const PLAYER = {
                playerId : P.player?._id,
                playerName : P.username,
                playedTournaments : P.player?.playedTournaments.length,
                totalScores : P.player?.playedTournaments.length ? P.player?.playedTournaments.reduce((p, n)=>p+n) : 0,
                earnedCoins : P.player?.earnedCoins,
                password : P.password
            } 
            return PLAYER;
        })
        res.status(StatusCodes.OK).json({
            totalCount : totalPlayers,
            data : players
        })
    }

    async addPlayer(req, res) {
        const createdPlayer = await player.create({
            playerName : req.body.playerName
        });
        req.playerId = createdPlayer._id;
        await authService.addUser(req, res);
    }

    async changePlayerStatus(req, res) {
        res.status(StatusCodes.OK).json({
            message : 'Player archived!'
        })
    }
}

module.exports = new PlayerService();