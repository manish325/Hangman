const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const tournment = require('../../../models/tournament');
const player = require('../../../models/player');

class PlayerTournamentService {

    constructor() {
        // this.deleteAllTournaments()
        this.getTournaments()
    }

    async getAllTournamentsToPlay(req, res) {
        const { searchText , pageSize , pageNumber , tournamentStatus, sortManner, filter} = req.body;
        const paginatedData = (pageNumber) * pageSize;
        const query = {
            status : tournamentStatus,
        }

        if(searchText) {
            query.tournamentName = {
                $regex: new RegExp(searchText, 'i')
            }
        }

        if(filter.category) {
            query.category = {
                $eq : new mongoose.Types.ObjectId(filter.category)
            }
        }
        const tournaments = await tournment.find({...query , status : 1, createdBy : { $ne : new mongoose.Types.ObjectId(req.params.id)}}).populate('category').limit(pageSize).sort({tournamentName : sortManner});
        
        const tournamentsToPlay = tournaments.map(T=>{
            const tournament = {
                tournamentName : T.tournamentName,
                tournamentDetails : T.tournamentDetails,
                tournamentCategory : T.category,
                tournamentPrizes : T.prizes
            }

            return tournament;
        })
        res.status(200).json({
           totalCount : tournaments.length,
           data : tournamentsToPlay
        })
    }

    async addTournament(req, res, next) {
        const tournamentToAdd = {
            tournamentName : req.body.tournamentName,
            tournamentDetails : req.body.tournamentDetails,
            category : req.body.tournamentCategory,
            createdBy : new mongoose.Types.ObjectId(req.body.playerId),
            prizes : {
                first : req.body.tournamentPrizes[0],
                second : req.body.tournamentPrizes[1],
                third : req.body.tournamentPrizes[2]
            },
            words : req.body.words
        }
        const createdTournament = await tournment.create(tournamentToAdd);
        req.tournamentId = createdTournament._id;
        next()       
    }

    async deleteAllTournaments() {
        await tournment.deleteMany()
    }

    async getTournaments() {
        const tournaments = await tournment.find();
    }

    async addTournamentToPlayerRecord(req, res) {
        const Player = await player.findOne({_id : req.body.playerId})
        Player.createdTournaments.push(new mongoose.Types.ObjectId(req.tournamentId))
        res.status(StatusCodes.CREATED).json({
            message : 'Tournament Created!'
        })
    }
}

module.exports = new PlayerTournamentService();