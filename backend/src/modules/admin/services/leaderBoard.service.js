
const { StatusCodes } = require("http-status-codes");
const score = require("../../../models/score")

class LeaderBoardService {
    constructor() {}

    async getLeaderboard(req, res) {
       const playersOfLeaderboard = await score.find().sort({score : 1});
       res.status(StatusCodes.OK).json({
        message : 'LeaderBoard route working fine'
       })

    }
}

module.exports = new LeaderBoardService()