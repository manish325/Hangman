const  {mongoose}  = require("../configs/db.config");

const user = mongoose.model ('user', new mongoose.Schema({
    username : {
        type : String
    },
    password : {
        type : String
    },
    about : {
        contactNumber : {
            type : String
        },
        address : {
            type : String
        },
        default : {}
    },
    roles : {
        type :[String]
    },
    player : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'player',
        default : null
    },
    isActive : {
        type : Boolean,
        default : true
    }
}));

module.exports = user;