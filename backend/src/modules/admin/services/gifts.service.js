const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');
const gifts = require('../../../models/gifts');
const notifications = require('../../../models/notifications');
const { mongo } = require('mongoose');

class GiftsService {


    async getAllGifts(req, res) {
        const { searchText , pageSize , pageNumber , status, sortManner} = req.body;
        const totalGifts = await gifts.countDocuments({isActive : status});
        const paginatedData = (pageNumber) * pageSize;
        const query = {
            isActive : status
        };  
        if(searchText) {
            query.giftName = {
                $regex: new RegExp(searchText, 'i')
            }
        };

        const Gifts = await gifts.find(query).skip(paginatedData).limit(pageSize).sort({giftName : sortManner});

        const giftsToSend = Gifts.map(G=>{
            return {
                giftId : G._id,
                giftName : G.giftName,
                giftValue : G.giftValue,
                quantity : G.quantity                
            }
        })
        res.status(StatusCodes.OK).json({
            totalCount : totalGifts,
            data : giftsToSend
        })
    }

    async addGift(req, res) {
        const {giftName , giftValue, quantity} = req.body;
        const newGift = await gifts.create({
            giftName ,
            giftValue ,
            quantity
        })
        res.status(StatusCodes.OK).json({
            message : 'Gift added with Id' + newGift._id
        })
    }

    async changeGiftStatus(req, res) {
        const giftId = req.params.id;
        const giftPendingRequests = await notifications.find({gift : new mongoose.Types.ObjectId(giftId) , approved : false});
        if(giftPendingRequests.length) {
            throw new BadRequest(res, "Pending claim requests for this gift!");
        } else  {
            const Gift = await gifts.findOne({_id : new mongoose.Types.ObjectId(giftId)});
            await Gift.updateOne({
                isActive : !Gift.isActive
            })
            res.status(StatusCodes.OK).json({
                message : 'Gift Status Changed!'
            })
        }
    }

    async updateGift(req , res) {
        const giftId = req.params.id;
        const {giftName , giftValue, quantity} = req.body;
        const updateGift = await gifts.findOneAndUpdate({_id : new mongoose.Types.ObjectId(giftId)}, {
            giftName, giftValue, quantity
        });
        res.status(StatusCodes.OK).json({
            message : 'Gift Updated!'
        })
    }
}

module.exports = new GiftsService();