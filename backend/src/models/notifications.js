const  {mongoose}  = require("../configs/db.config");

const notifications = mongoose.model('notifications', new mongoose.Schema({
    player : {
        type : mongoose.Types.ObjectId,
        ref : 'player'
    },
    tournament : {
        type : mongoose.Types.ObjectId,
        ref : 'tournament',
        default : null
    },
    gift: {
        
       type :  [{
        giftId: { type: mongoose.Types.ObjectId, ref: 'gifts' }, // Reference to the 'gifts' collection
        giftQuantity: Number,
      }],

      default : []
    
    },
    approved : {
        type : Number,
        enum : [-1, 1, 0],
        default : -1
    }
}));

module.exports = notifications;