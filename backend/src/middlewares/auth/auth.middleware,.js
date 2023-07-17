const { BadRequest, UnauthorizedError } = require("../../configs/errors");
const user = require("../../models/user.model");
const roles = require("../../core/constants");
const { mongoose } = require("../../configs/db.config");
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const adminAuthMiddleware = async (req, res, next)=>{
    const {userId} = req.body;
    if(!userId) {
        throw new BadRequest(res, "Please provide user ID!");
    } else {
        const url = req.url;
        const aUser = await user.findOne({_id : new mongoose.Types.ObjectId(userId)})
        if(aUser.roles.includes(roles.admin)) {
           next()
        }  else 
        throw new UnauthorizedError(res , "Access denied");
    }
}

const playerAuthMiddleware  = async (req, res, next)=>{
    const {userId} = req.body;
    if(!userId) {
        throw new BadRequest(res, "Please provide user ID!");
    } else {
        const url = req.url;
        const aUser = await user.findOne({_id : new mongoose.Types.ObjectId(userId)})
        if(aUser.roles.includes(roles.player)) {
            next()
        }  else 
        throw new UnauthorizedError(res , "Access denied");
    }
}

// const authMiddleWare = (role)=> {
//     switch(role) {
//         case 'admin' : 
//         return adminAuthMiddleware;
//         case 'player' : 
//         return playerAuthMiddleware
//     }
// }

const authMiddleWare = (req, res, next)=> {

    const url = req.url;
    if(!url.includes('auth') && url !=='/admin/categories/getAllCategories') {
        const token = req.headers.authorization.split(' ')[1];
        const userDetails = jwt.verify(token, secretKey);
        if((req.url.includes('admin') && userDetails.roles.includes(roles.admin) )|| (req.url.includes('player') && userDetails.roles.includes(roles.player))) {
            next()
        } else 
        throw new UnauthorizedError(res , 'Access Denied');
    } else 
    next()
}
module.exports = authMiddleWare;