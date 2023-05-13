const ErrorHandler = require("../error/errorHandler");

const validatePassword = (password) => {
    if(!password) {
        throw new ErrorHandler(400, "Password is required");
    }
    if(password[0] === ' ' || password[password.length - 1] === ' ') {
        throw new ErrorHandler('Password cannot start or end with a space', 400);
    }
    if(password.length < 8) {
        throw new ErrorHandler('Password must be at least 8 characters', 400);
    }
}

module.exports = validatePassword;