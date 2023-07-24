const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const tournment = require('../../../models/tournament');
const player = require('../../../models/player');
const score = require('../../../models/score');
const gifts = require('../../../models/gifts');
const notifications = require('../../../models/notifications');

class PlayerGiftService {
    async addGiftToPlayerRecords(req, res) {
        //add in format { giftId : string , giftQuantity : number }
        //If gift Id exist, increase gift quantity else add another one
    }

    async getGiftsToClaim(req, res) {
        //get the player,  //get his/her current coins, //get gifts based on this
        const playerId = req.userDetails.player;
        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(playerId)});
        let playerAvailableCoins = Player.earnedCoins;
        const pendingNotifications = await notifications.find({
            player : {
                $eq : new mongoose.Types.ObjectId(playerId)
            },
            gift : {
                $size : {
                    $ne : 0
                }
            },
            approved : -1
        }).populate('gift.giftId')

        if(pendingNotifications.length) {
            pendingNotifications.forEach(N=>{
                N.gift.forEach(G=>{
                    playerAvailableCoins-=G.giftId.giftValue
                })
            })
        }
        const Gifts = await gifts.find({giftValue : {
            $lte : playerAvailableCoins
        }});
        const giftsAvailable = Gifts.map(G=>{
            return {
                giftId : G._id,
                giftName : G.giftName,
                giftValue : G.giftValue,
                quantity : G.quantity
            }
        });

        res.status(StatusCodes.OK).json({
            totalCount : giftsAvailable.length,
            data : giftsAvailable
        });

    }

    async claimGifts(req, res, next) {
        req.customMessage = 'Requested admin for gift claims!'
        req.gifts = req.body.map(G=>{
            return {
                giftId : G.giftId,
                quantity : G.quantity
            }
        })
    }
}

module.exports = new PlayerGiftService();