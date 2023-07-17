const  {mongoose}  = require("../configs/db.config");

const gifts = mongoose.model('gifts', new mongoose.Schema( {
    giftName : String,
    giftValue : Number,
    quantity : Number,
    isActive : {
        type : Boolean,
        default : true
    }
}));

module.exports = gifts;