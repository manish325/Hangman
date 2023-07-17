const  {mongoose}  = require("../configs/db.config");

const category = mongoose.model ('category', new mongoose.Schema( {
    categoryName : {
        type : String
    },
    categoryDetails : {
        type : String
    },
    categoryStatus : {
        type  : Boolean,
        default : true
    }
}));

module.exports = category;