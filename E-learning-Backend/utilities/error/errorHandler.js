class ErrorHandler extends Error{
    constructor(message, statusCode){
        super();
        this.statusCode = statusCode;
        this.error = {
            message,
            success: false
        }
    }
}

module.exports = ErrorHandler;