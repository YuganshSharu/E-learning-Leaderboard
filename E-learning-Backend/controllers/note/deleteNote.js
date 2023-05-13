const Note = require('../../models/noteSchema');

const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        await Note.findByIdAndDelete(noteId);
        res.status(200).json({
            success: true,
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = deleteNote