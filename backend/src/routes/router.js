const  authMiddleWare  = require('../middlewares/auth/auth.middleware,');
const adminRouter = require('../modules/admin/routes/admin.routes');
const authRouter = require('../modules/auth/routes/auth.routes');
const playerRouter = require('../modules/player/routes/player.router');

//Imports routers from all modules and register in main application
const mainRouter = require('express').Router();

mainRouter.use('/auth', authRouter);

mainRouter.use('/admin', adminRouter);
mainRouter.use('/player', playerRouter);

module.exports = mainRouter;