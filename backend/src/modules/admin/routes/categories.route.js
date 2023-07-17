const categoriesService = require('../services/categories.service');

const categoriesRouter = require('express').Router();

categoriesRouter.post('/getAllCategories', categoriesService.getAllCategories);
categoriesRouter.post('/addCategory', categoriesService.addCategory);
categoriesRouter.put('/updateCategory/:id', categoriesService.updateCategory);
categoriesRouter.delete('/changeCategoryStatus/:id', categoriesService.changeCategoryStatus)
module.exports = categoriesRouter