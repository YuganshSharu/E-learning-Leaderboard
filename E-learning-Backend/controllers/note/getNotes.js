const Note = require('../../models/noteSchema');
const mongoose = require('mongoose');

const getNotes = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const userId = req.user._id;
        const notes = await Note.find({video: videoId, createdBy: userId});
        res.status(200).json({
            success: true,
            notes
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = getNotes