const notificationService = require('../../admin/services/notification.service');
const playerGiftsService = require('../services/player.gifts.service');

const playerGiftsRouter = require('express').Router();

playerGiftsRouter.get('/getGiftsToClaim', playerGiftsService.getGiftsToClaim);
playerGiftsRouter.post('/claimGifts', [ playerGiftsService.claimGifts , notificationService.pushNotification]);
playerGiftsRouter.get('/getAllAvailableGifts', playerGiftsService.getAllAvailableGifts)
module.exports = playerGiftsRouter;