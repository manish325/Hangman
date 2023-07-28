const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest, CustomApiError } = require('../../../configs/errors');
const tournment = require('../../../models/tournament');
const player = require('../../../models/player');
const score = require('../../../models/score');
const gifts = require('../../../models/gifts');
const notifications = require('../../../models/notifications');

class PlayerGiftService {
    async addGiftToPlayerRecords(req, res) {
        //add in format { giftId : string , giftQuantity : number }
        //If gift Id exist, increase gift quantity else add another one
        const {Gifts, giftObjectIds, query} = res.locals;
        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(req.userDetails?.player?.playerId)});
        giftObjectIds.map(async (G, index)=>{
          const updatedPlayer = await player.updateOne(
                {
                    'gifts.giftId' : G 
                },
                {
                    $set : {
                        'gifts.$.giftQuantity' : Gifts[index].quantity
                    }
                }
            );
            if(!updatedPlayer){
                Player.updateOne({
                   $push : {
                    gifts : {
                        giftId : Gifts[index].giftId,
                        giftQuantity : Gifts[index].quantity
                    }
                   }
                })
            }
        });

        res.status(StatusCodes.ACCEPTED).send();
    }

    async getGiftsToClaim(req, res) {
        //get the player,  //get his/her current coins, //get gifts based on this
       try { const playerId = req.userDetails.player.playerId;
        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(playerId)});
        let playerAvailableCoins = Player.earnedCoins;
        const pendingNotifications = await notifications.find({
            player: new mongoose.Types.ObjectId(playerId),
            gift: { $not: { $size: 0 } }, // Check if the 'gift' field is not an empty array
            approved: -1,
          }).populate('gift.giftId');

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
            availableCoins : playerAvailableCoins,
            data : giftsAvailable
        });} catch(e) {
            console.log(e);
            throw new CustomApiError(e);
        }

    }

    async claimGifts(req, res, next) {
        req.customMessage = 'Requested admin for gift claims!'
        req.gifts = req.body.map(G=>{
            return {
                giftId : G.giftId,
                quantity : G.quantity
            }
        });
        next();
    }

    async getAllAvailableGifts(req, res) {
        const playerId = req.userDetails.player.playerId;
        const Player = await player.findOne({_id : new mongoose.Types.ObjectId(playerId)});
        const availableGifts = Player.gifts.map(G=>{
            return {
                giftId : G._id,
                giftName : G.giftName,
                giftValue : G.giftValue,
                quantity : G.quantity
            }
        });

        res.status(StatusCodes.OK).json({
            totalCount : availableGifts.length,
            data : availableGifts
        })
    }
}

module.exports = new PlayerGiftService();