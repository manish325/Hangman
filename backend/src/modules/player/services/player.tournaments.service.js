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
        const { searchText , pageSize , pageNumber , tournamentStatus, sortManner, filter, self} = req.body;
        const paginatedData = (pageNumber) * pageSize;
        const query = {
            status : tournamentStatus,
            createdBy : self ? {$eq : new mongoose.Types.ObjectId(req.params.id)} :{ $ne : new mongoose.Types.ObjectId(req.params.id)}
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
        const tournaments = await tournment.find({...query , status : 1}).populate('category').limit(pageSize).sort({tournamentName : sortManner});
        
        const tournamentsToPlay = tournaments.map(T=>{
            const tournament = {
                tournamentId : T._id,
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
        console.log('Player ID RECIEVED : ' , req.tournamentId);

        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(req.body.playerId)});
        await Player.updateOne({
            $push : {
                createdTournaments : new mongoose.Types.ObjectId(req.tournamentId)
            }
        });
        const allPlayers = await player.find();
        console.log(allPlayers)
        res.status(StatusCodes.CREATED).json({
            message : 'Tournament Created By ' + Player.playerName
        })
    }

    async printAllPlayers() {
        const allPlayers = await player.find();
        console.log(allPlayers)
    }

    async getTournamentDetails(req, res) {
    //     export interface ITournamentDetails {
    //         tournamentName : string,
    //         tournamentDetails : string,
    //         tournamentCategory : string,
    //         wordsCount : number,
    //         tournamentPrizes : Array<number>,
    //         words : {
    //             wordId : string,
    //             word : string,
    //             hint : string
    //         }[]
    //     }
        const tournamentId = req.params.tournamentId;
        const T = await tournment.findOne({_id : new mongoose.Types.ObjectId(tournamentId)}).populate('category')
        const tournamentToSend = {
            tournamentName : T.tournamentName,
            tournamentDetails : T.tournamentDetails,
            tournamentCategory : T.category.categoryName,
            wordsCount : T.words.length,
            tournamentPrizes : [
                T.prizes.first, T.prizes.second, T.prizes.third
            ],
            words : T.words.map(W=>{
                const word = {
                    word : W.word,
                    hint : W.hint,
                    wordId : W._id
                  }
                  return word;
            })
        }
        res.status(StatusCodes.OK).json({
            ...tournamentToSend
        })
    }
}

module.exports = new PlayerTournamentService();