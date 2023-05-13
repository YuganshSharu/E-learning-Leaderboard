// Importing Modules
const mongoose = require('mongoose');
const validateVideo = require('../utilities/validation/video');

// Note Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['public', 'private'],
    }
}, {timestamps: true});

noteSchema.statics.extractFields = (allFields) => {
    let { title, content, video, status = 'private' } = allFields;
    title = title?.trim();
    content = content?.trim();
    video = video?.trim();
    return {
        title,
        content,
        video,
        status
    }
}

noteSchema.statics.validateFields = async (note) => {
    const {title, content, video, status} = note;
    if(!title) {
        throw {
            success: false,
            message: 'Title is required'
        };
    }
    if(!content) {
        throw {
            success: false,
            message: 'Content is required'
        };
    }
    validateVideo(video);
    if(!status || (status !== 'public' && status !== 'private')) {
        throw {
            success: false,
            message: 'Status is not valid'
        };
    }
}

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;