const playerGiftsService = require('../../player/services/player.gifts.service');
const giftsService = require('../services/gifts.service');
const notificationService = require('../services/notification.service');
const tournamentService = require('../services/tournament.service');

const requestRouter = require('express').Router();

requestRouter.get('/getAllRequests', notificationService.getAllNotifications );
requestRouter.post('/tournamentRequest', [notificationService.changeNotificationStatus, tournamentService.updateTournamentStatus]);
requestRouter.post('/giftsRequest', [notificationService.changeNotificationStatus, giftsService.updateGiftQuantity, playerGiftsService.addGiftToPlayerRecords]);
module.exports = requestRouter;