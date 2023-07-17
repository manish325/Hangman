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
        type : Boolean,
        default : false
    }
}));

module.exports = notifications;