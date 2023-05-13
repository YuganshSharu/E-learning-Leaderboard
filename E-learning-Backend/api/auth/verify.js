const express = require('express');
const sendVerificationMail = require('../../controllers/auth/verification/sendVerificationMail');
const router = express.Router();
const JwtVerification = require('../../middleware/auth');
const verifyToken = require('../../controllers/auth/verification/verifyToken');

router.get('/send', JwtVerification, async (req, res) => {
    sendVerificationMail(req, res);
});

router.get('/', async (req, res) => {
    verifyToken(req, res);
});

module.exports = router;