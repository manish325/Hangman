const {StatusCodes} = require('http-status-codes');
const player = require('../../../models/player');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const user = require('../../../models/user.model');
const roles = require('../../../core/constants');
const authService = require('../../auth/services/auth.service');
const tournment = require('../../../models/tournament');

class TournamentService {
    constructor() {
        // this.printAllTournaments();
    }

        async printAllTournaments() {
            const allTournaments = await tournment.find();
            console.log(allTournaments);
        }
        async getAllTournaments(req, res) {

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

            if(filter.player) {
                query.createdBy = {
                    $eq : new mongoose.Types.ObjectId(filter.player)
                }
            }
            const Tournaments = await tournment.find(query).skip(paginatedData).sort({tournamentName : sortManner}).populate('category').populate('createdBy');

            const requiredTournaments = Tournaments.map((T)=>{
                const t = {
                    tournamentId : T._id,
                    tournamentName : T.tournamentName,
                    tournamentDetails : T.tournamentDetails,
                    tournamentCategory : {
                        categoryId : T.category?._id,
                        categoryName : T.category?.categoryName,
                    },
                    tournamentPrizes : [T.prizes.first, T.prizes.second, T.prizes.third],
                    words : T.words,
                    playerId  : {
                        playerId : T.createdBy?._id,
                        playerName : T.createdBy.playerName,
                    } 
                }

                return t;
            })

            res.status(StatusCodes.OK).json({
                totalCount : await tournment.countDocuments(query),
                data : requiredTournaments
            })
        }

        async updateTournamentStatus(req, res, next) {
            const {approved, tournamentId} = req.body;
            const tournamentToUpdate = await tournment.findOne({_id : new mongoose.Types.ObjectId(tournamentId)})
            if(approved) {
                await tournamentToUpdate.updateOne({
                    status : 0
                })
            } else {
                await tournamentToUpdate.updateOne({
                    status : 1
                })
            }

            res.status(StatusCodes.ACCEPTED).send();
        } 
}

module.exports = new TournamentService();