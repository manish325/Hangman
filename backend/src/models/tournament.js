const  {mongoose}  = require("../configs/db.config");

const tournment = mongoose.model('tournament', new mongoose.Schema( {
    tournamentName : String,
    tournamentDetails : String,
    words : [{
        word : String,
        hint : String
    }],
    status : {
        type : Number,
        enum : [-1, 1, 0],
        default : -1
    },
    category :  {
        type : mongoose.Types.ObjectId,
        ref : 'category'
    },
    prizes : {
        first : Number,
        second : Number,
        third : Number
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'player'
    }
    
}))

module.exports = tournment;