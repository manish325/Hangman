require('dotenv').config();
const {mongoose, connectDB}  = require('./src/configs/db.config');
const applyMiddleWares = require('./src/middlewares');
const exceptionHandler = require('./src/middlewares/error-handler/exception');
const mainRouter = require('./src/routes/router');
const portNumber =  process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const express = require('express');
const app = express();
require('express-async-errors');

// app.use((req, res)=>{
//     r
// })

applyMiddleWares(app);
app.use('/', mainRouter);
app.use(exceptionHandler);
const start = async ()=> {
        await connectDB(DB_URI);
        app.listen(portNumber, console.log('Server Started')) ;    
}

start();