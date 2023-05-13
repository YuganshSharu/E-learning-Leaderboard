const validateTime = (time) => {
    if(!time) {
        throw {
            success: false,
            message: 'Time is required'
        };
    }
}

module.exports = validateTime;