const mongoose = require('mongoose');
const ErrorHandler = require('../utilities/error/errorHandler');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    }
});


const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;