const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const tournment = require('../../../models/tournament');
const player = require('../../../models/player');
const score = require('../../../models/score');
const { query } = require('express');

class PlayerTournamentService {

    constructor() {
        // this.deleteAllTournaments()
        // this.getTournaments()
    }

    async getAllTournamentsToPlay(req, res) {
        const { searchText , pageSize , pageNumber , tournamentStatus, sortManner, filter, self} = req.body;
        const paginatedData = (pageNumber) * pageSize;
        const query = {
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

        if(!self) {
            query.status = 1
        }

        const tournaments = await tournment.find({...query}).populate('category').limit(pageSize).sort({tournamentName : sortManner});
        const tournamentsPlayedByPlayer = await player.findOne({_id : new mongoose.Types.ObjectId(req.userDetails.player)});
        const tournamentsArray = tournamentsPlayedByPlayer.playedTournaments.map(T=>T.tournamentId.toString());
        const tournamentsToPlay = tournaments.map(T=>{
            const tournament = {
                tournamentId : T._id,
                tournamentName : T.tournamentName,
                tournamentDetails : T.tournamentDetails,
                tournamentCategory : {
                    categoryId : T.category._id,
                    categoryName : T.category.categoryName,
                    categoryDetails : T.category.categoryDetails
                },
                tournamentPrizes : [T.prizes.first, T.prizes.second, T.prizes.third],
                played : tournamentsArray.includes(T._id.toString()),
                approvalStatus : T.status
            }
            return tournament;
        }).filter(T=>!T.played);
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
        await player.findOneAndUpdate({playerName : 'manish.I'}, {
            playedTournaments : []
        })
    }

    async addTournamentToPlayerRecord(req, res, next) {
        let query;
        if(req.played) {
            query = {
                $push : {
                    playedTournaments : {
                        tournamentId : new mongoose.Types.ObjectId(req.tournamentId),
                        score : req.score
                    }
                }
            }
        } else  {
            query = {
                $push : {
                    createdTournaments : new mongoose.Types.ObjectId(req.tournamentId)
                }
            }
        }
        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(req.userDetails.player)}).updateOne(query);
        req.customMessage = 'Tournament Created!'
        next();
    }

    async printAllPlayers() {
        const allPlayers = await player.find();
    }

    async getTournamentDetails(req, res) {
        const tournamentId = req.params.tournamentId;
        const T = await tournment.findOne({_id : new mongoose.Types.ObjectId(tournamentId)}).populate('category')
        const tournamentToSend = {
            tournamentName : T.tournamentName,
            tournamentDetails : T.tournamentDetails,
            tournamentCategory : {
                categoryId : T.category._id,
                categoryName : T.category.categoryName
            },
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
        if(req.played) {
            res.status(StatusCodes.OK)
        } else
        res.status(StatusCodes.OK).json({
            ...tournamentToSend
        })
    }

    async submitScore(req, res, next) {
        const Score = req.body;
        if(Score.scoreId) {
            await score.findOneAndUpdate({_id : new mongoose.Types.ObjectId(Score.scoreId)}, {
                playerId : Score.playerId,
                tournamentId : Score.tournamentId,
                categoryId : Score.categoryId,
                score : Score.score
            })
        } else {
            await score.create(Score);
        }
        req.played = true;
        req.tournamentId = Score.tournamentId;
        req.score = Score.score;
        next();
    }

    async getAllPlayedTournaments(req, res) {
        const { searchText , pageSize , pageNumber , sortManner, filter, self} = req.body;
        const paginatedData = (pageNumber+1) * pageSize;

        const playerId = req.userDetails.player;
        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(playerId)}).populate({
            path: 'playedTournaments.tournamentId',
            populate: {
              path: 'category', // Field path to populate inside the tournament
              model: 'category', // The name of the referenced model (organizer)
            },
          });
        let endResult = [];
        const playedTournaments = Player.playedTournaments.map(P=>{ 
            return {
                tournamentId : P.tournamentId._id,
                tournamentName : P.tournamentId.tournamentName,
                tournamentDetails : P.tournamentId.tournamentDetails,
                tournamentCategory : {
                    categoryId : P.tournamentId.category._id,
                    categoryName : P.tournamentId.category.categoryName,
                    categoryDetails : P.tournamentId.category.categoryDetails
                },
                tournamentPrizes : [P.tournamentId.prizes.first , P.tournamentId.prizes.second, P.tournamentId.prizes.third],
                score : P.score
            }
        });

        if(searchText) {
            endResult = [...playedTournaments].filter(p=>p.tournamentName.toLowerCase().includes(searchText.toLowerCase())).splice(0, paginatedData).splice(0, pageSize);
        } else 
        endResult = [...playedTournaments].splice(0, paginatedData).splice(0, pageSize);

        if(filter.category) {
            endResult = endResult.filter(r=>r.tournamentCategory.categoryId._id===filter.category);
            console.log('EndResult Is : ', endResult)
        }

        res.status(StatusCodes.OK).json({
            totalCount : searchText ? playedTournaments.filter(p=>p.tournamentName.includes(searchText)).length : playedTournaments.length,
            data : endResult
        })

    }
}

module.exports = new PlayerTournamentService();