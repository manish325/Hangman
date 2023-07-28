
const { StatusCodes } = require("http-status-codes");
const score = require("../../../models/score");
const { default: mongoose } = require("mongoose");

class LeaderBoardService {
    constructor() {
        // playerName : string,
        // tournamentName : string,
        // categoryName : string,
        // score : number,
        // tournamentsPlayed : number
    }

    async getLeaderboard(req, res) {
       const { searchText , pageSize , pageNumber, filter} = req.body;
       const paginatedData = (pageNumber) * pageSize;
       const query = {
        score : {
            $ne : 0
        }
       };
       if(filter.category) {
        query.categoryId = {
            $eq : new mongoose.Types.ObjectId(filter.category)
        }
       }
       if(filter.tournament) {
        query.tournamentId = {
            $eq : new mongoose.Types.ObjectId(filter.tournament)
        }
       }
       if(searchText) {
        query.username = {
            $regex: new RegExp(searchText, 'i')
        }
    }
       const playersOfLeaderboard = await score.find(query).skip(paginatedData).limit(pageSize).populate(['playerId', 'tournamentId', 'categoryId']).sort({score : -1});
       const LeaderBoard = playersOfLeaderboard.map(p=>{
        return {
            player : {
                playerId : p.playerId._id,
                playerName : p.playerId.playerName
            },
            tournament : {
                tournamentId : p.tournamentId._id,
                tournamentName : p.tournamentId.tournamentName
            },
            category : {
                categoryId : p.categoryId._id,
                categoryName : p.categoryId.categoryName
            },
            score : p.score,
            tournamentsPlayed : p.playerId?.tournamentsPlayed?.length
        }
       })
       res.status(StatusCodes.OK).json({
        totalCount : await score.countDocuments(query),
        data : LeaderBoard
       })

    }
}

module.exports = new LeaderBoardService()