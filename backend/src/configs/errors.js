const {StatusCodes} = require('http-status-codes');

class CustomApiError extends Error {
    constructor(message){
        super(message);
    }
}

class BadRequest extends CustomApiError {
    constructor(res, message) {
        res.status(StatusCodes.BAD_REQUEST);
        super(message);
    }
}

class UnauthorizedError extends CustomApiError {
    constructor(res, message) {
        res.status(StatusCodes.UNAUTHORIZED);
        super(message);
    }
}

module.exports = {CustomApiError, BadRequest, UnauthorizedError}