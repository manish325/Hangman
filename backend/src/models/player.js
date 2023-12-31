const  {mongoose}  = require("../configs/db.config");

const player = mongoose.model ('player', new mongoose.Schema( {
    playerName : String,
    createdTournaments : {
        type : [mongoose.Types.ObjectId],
        ref : 'tournament',
        default : []
    },
    playedTournaments : 
       { 
           type : [{
            tournamentId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'tournament'
            },
            score : Number
        }],
        default : []
    },
    earnedCoins : {
        type : Number,
        default : 0
    },
    gifts: [{
        giftId: { type: mongoose.Types.ObjectId, ref: 'gifts' }, // Reference to the 'gifts' collection
        giftQuantity: Number,
      }]
}));

module.exports = player;