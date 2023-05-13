const ErrorHandler = require("../error/errorHandler");

const validatePhoneNumber = (phoneNumber) => {
    if(!phoneNumber) {
        return;
    }
    phoneNumber = phoneNumber.trim();
    const phoneNumberFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!phoneNumber.match(phoneNumberFormat)) {
        throw new ErrorHandler('Phone number is not valid');
    }

}

module.exports = validatePhoneNumber;