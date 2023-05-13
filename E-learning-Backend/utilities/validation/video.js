const Video = require('../../models/videoSchema');
const ErrorHandler = require("../error/errorHandler");
const mongoose = require('mongoose');

const validateVideo = async (videoId) => {
    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ErrorHandler('Video is not valid');
    }
    const video = await Video.findById(videoId);
    if(!video) {
        throw new ErrorHandler('Video is not valid');
    }
}

module.exports = validateVideo;