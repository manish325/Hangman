const exceptionHandler = async (err,req, res, next) => {
    res.json({
        message : err.message
    }).send();
}

module.exports = exceptionHandler;