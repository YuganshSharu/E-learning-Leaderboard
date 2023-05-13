const Note = require('../../models/noteSchema');

const addNote = async (req, res) => {
    try {
        const newNoteData = Note.extractFields(req.body);
        newNoteData.createdBy = req.user._id;
        Note.validateFields(newNoteData);
        const newNote = new Note(newNoteData);
        const note = await newNote.save();
        res.status(200).json({
            message: 'Note added successfully',
            success: true,
            note
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = addNote;