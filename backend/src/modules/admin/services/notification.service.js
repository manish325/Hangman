const {StatusCodes} = require('http-status-codes');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const notifications = require('../../../models/notifications');

class NotificationService {
        async pushNotification(req , res) {
            const {tournamentId, gifts, customMessage} = req;
            const player = req.userDetails.player.playerId;
            const notificationToCreate = {
                player : new mongoose.Types.ObjectId(player),
            }
            if(tournamentId) {
                notificationToCreate.tournament = new mongoose.Types.ObjectId(tournamentId);
            }
            if(gifts) {
                notificationToCreate.gift = gifts.map(G=>{
                    return {
                        giftId : new mongoose.Types.ObjectId(G.giftId),
                        giftQuantity : G.quantity
                    }
                })
            }
            console.log('Notification To Create : ', notificationToCreate);
            await notifications.create(notificationToCreate);
            res.status(StatusCodes.ACCEPTED).json({
                message : customMessage
            })
        }

        async getAllNotifications(req, res) {
            const Notifications = await notifications.find().populate(['player', 'tournament', 'gift.giftId', 'tournament.category']);
            const notificationsToSend = Notifications.map(N=>{
                return {
                    notificationId : N._id,
                    player : {
                        playerId : N.player._id,
                        playerName : N.player.playerName
                    },
                    tournament : N.tournament ? {
                        tournamentId : N.tournament._id,
                        tournamentName : N.tournament.tournamentName,
                        tournamentDetails : N.tournament.tournamentDetails,
                        tournamentCategory : N.tournament.category,
                        tournamentPrizes : [N.tournament.prizes.first, N.tournament.prizes.second, N.tournament.prizes.third]
                    } : null,
                    gift : N.gift.length ? (()=>{
                        const gifts = N.gift.map(G=>{
                            return {
                                giftId : G.giftId._id,
                                giftName : G.giftId.giftName,
                                giftValue : G.giftId.giftValue,
                                quantity : G.giftId.quantity
                            }
                        });
                        return gifts;
                    })() : [],
                    notificationStatus : N.approved
                }
            });

            res.status(StatusCodes.OK).json({
                totalCount : notificationsToSend.length,
                data : notificationsToSend
            })
        }

        async changeNotificationStatus (req, res) {
            const {approved, notificationId} = req.body;
            const updatedNotification = await notifications.findOneAndUpdate({_id : new mongoose.Types.ObjectId(notificationId)}, {
                approved : approved
            });
            if(updatedNotification.tournament || (!updatedNotification.tournament && approved)) {
                next();
            } else if(!approved){
                res.status(StatusCodes.ACCEPTED).send();
            } 
        }
}

module.exports  = new NotificationService();