const {StatusCodes} = require('http-status-codes');
const category = require('../../../models/category');
const { mongoose } = require('../../../configs/db.config');
const { BadRequest } = require('../../../configs/errors');

class CategoryService {
    constructor() {}

    async getAllCategories(req, res) {
        const { searchText , pageSize , pageNumber , status, sortManner} = req.body;
        const totalCategories = await category.countDocuments({categoryStatus : status});
        const paginatedData = (pageNumber) * pageSize;
        const query = {
            categoryStatus : status
        };  
        if(searchText) {
            query.categoryName = {
                $regex: new RegExp(searchText, 'i')
            }
        }
        const categories = await category.find(query).skip(paginatedData).sort({categoryName : sortManner});
        
        const allCategories = [];
        categories.map(c=>{
            allCategories.push(
                {
                    categoryId : c._id,
                    categoryName : c.categoryName,
                    categoryDetails : c.categoryDetails
                }
            )
        })
        res.status(StatusCodes.OK).json({
            totalCount : totalCategories,
            data : allCategories
        })
    }

    async addCategory(req, res) {
        const categoryToAdd = {
            categoryName : req.body.categoryName,
            categoryDetails : req.body.categoryDetails,
            categoryStatus : req.body.categoryStatus !== undefined ? req.body.categoryStatus : true 
        };

        const result = await category.create(categoryToAdd)
        res.status(StatusCodes.CREATED).json({
            message : 'Category Added Successfully!'
        })
    }

    async updateCategory(req, res) {
        const cateoryId = req.params.id;
        const updatedCategory = {
            categoryName : req.body.categoryName,
            categoryDetails : req.body.categoryDetails
        }

        if(await category.findOne(updatedCategory)) {
                throw new BadRequest(res, "Category already exists");
        } else {

            const categoryToUpdate = await category.findOneAndUpdate({_id : cateoryId}, updatedCategory)
            res.status(StatusCodes.OK).json({
                message : `Category with ID ${cateoryId} updated successfully!`
            })
        }

    }

    async changeCategoryStatus(req, res) {
        const categoryId = req.params.id;

        const categoryToUpdate = await category.findOne({_id : categoryId});
        if(!categoryToUpdate) {
            throw new BadRequest(res, "Please send valid category ID")
        } else {
            await category.findOneAndUpdate({_id : categoryId}, {categoryStatus : !categoryToUpdate.categoryStatus});
            res.status(StatusCodes.OK).json({
                message : 'Category status changed successfully!'
            })
        }
    }
}

module.exports = new CategoryService()