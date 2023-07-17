const giftsService = require('../services/gifts.service');

const giftsRouter = require('express').Router();

giftsRouter.post('/getAllGifts', giftsService.getAllGifts);
giftsRouter.post('/addGift', giftsService.addGift);
giftsRouter.put('/updateGift', giftsService.updateGift);
giftsRouter.delete('/changeGiftStatus/:id', giftsService.changeGiftStatus)
module.exports = giftsRouter