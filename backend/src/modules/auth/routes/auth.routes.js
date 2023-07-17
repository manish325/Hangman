
const exceptionHandler = require('../../../middlewares/error-handler/exception');
const authService = require('../services/auth.service');

const authRouter = require('express').Router();
authRouter.post('/login', authService.login);
module.exports = authRouter