const {mongoose}  = require("../configs/db.config");

const score = mongoose.model('score', new mongoose.Schema({
    playerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'player'
    },
    tournamentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'tournament'
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    score : Number
}));

module.exports = score;