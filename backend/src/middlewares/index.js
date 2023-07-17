const exceptionHandler = require("./error-handler/exception")
const express = require('express');
const app = express();
const cors = require('cors');
const authMiddleWare = require("./auth/auth.middleware,");

const applyMiddleWares = (app)=>{
    app.use(cors())
    app.use(express.json());
    app.use(authMiddleWare)
}

module.exports = applyMiddleWares;