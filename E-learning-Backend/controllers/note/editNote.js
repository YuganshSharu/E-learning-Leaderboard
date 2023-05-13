const Note = require('../../models/noteSchema');

const editNote = async (req, res) => {
    try {
        const {title, content, time} = req.body;
        const noteId = req.params.noteId;
        await Note.findByIdAndUpdate(noteId, {title, content})
        res.status(200).json({
            message: 'Note edited successfully',
            success: true,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = editNote;