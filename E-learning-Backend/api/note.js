const express = require('express');
const addNote = require('../controllers/note/addNote');
const getNotes = require('../controllers/note/getNotes');
const deleteNote = require('../controllers/note/deleteNote');
const editNote = require('../controllers/note/editNote');
const JwtVerification = require('../middleware/auth');
const isEmailVerified = require('../middleware/isEmailVerified');
const router = express.Router();

router.post('/', JwtVerification, isEmailVerified, addNote);
router.get('/:videoId', JwtVerification, isEmailVerified, getNotes);
router.patch('/:noteId', JwtVerification, isEmailVerified, editNote);
router.delete('/:noteId', JwtVerification, isEmailVerified, deleteNote)

module.exports = router;