const { default: mongoose } = require("mongoose");
const { UnauthorizedError } = require("../../../configs/errors");
const roles = require("../../../core/constants");
const user = require("../../../models/user.model");
const { StatusCodes } = require('http-status-codes');
const JSON = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
require('express-async-errors');


class AuthService {

    constructor() {
        // this.createMe();
    }

    async login(req, res, next) {
        const aUser = await user.findOne({...req.body, isActive : true});
        console.log(aUser);
        if (aUser) {
                const payload = {
                    id: aUser._id,
                    username: aUser.username,
                    roles: aUser.roles
                }
                const token = JSON.sign(payload, secretKey);
                await res.status(200).json({
                    token,
                    userDetails: aUser
                })
        } else {
            throw new UnauthorizedError(res, "Access Denied");
        }
    }

    async createMe() {
        // await user.deleteMany()
        const admin = await user.find({
            username: 'ingalemanish7@gmail.com',
            password: 'password'
        });
        if (admin.length === 0) {
            await user.insertMany([{
                username: 'ingalemanish7@gmail.com',
                password: 'password',
                roles: [roles.admin]
            }]);
        }
    }

    async addUser(req, res) {
        const { username, password, about } = req.body;
        const userDetails = {
            username, password, player: req.playerId, roles: roles.player
        }
        if (about) {
            userDetails.about = about;
        }
        const newUser = await user.create(userDetails);
        res.status(StatusCodes.CREATED).json({
            message: 'Player Added Successfully'
        })
    }

    async changeUserStatus(req, res , next) {
        const userId = req.params.id;
        console.log(userId)
        const aUser = await user.findOne({player :new mongoose.Types.ObjectId(userId)});
        await aUser.updateOne({
            isActive : !aUser.isActive
        })
        next();
    }

}

module.exports = new AuthService();