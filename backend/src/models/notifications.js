const  {mongoose}  = require("../configs/db.config");

const notifications = mongoose.model('notifications', new mongoose.Schema({
    player : {
        type : mongoose.Types.ObjectId,
        ref : 'player'
    },
    tournament : {
        type : mongoose.Types.ObjectId,
        ref : 'tournament',
    },
    gift : {
        type : mongoose.Types.ObjectId,
        ref : 'gifts'
    },
    approved : {
        type : Number,
        enum : [-1, 1, 0],
        default : -11
    }
}));

module.exports = notifications;