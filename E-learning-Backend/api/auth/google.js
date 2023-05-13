const express = require('express');
const router = express.Router();
const { googleAuth, googleAuthCallback } = require('../../controllers/auth/googleAuth');

router.get('/', (req, res) => {
    googleAuth(req, res);
});

router.get('/callback', (req, res) => {
    googleAuthCallback(req, res);
})

module.exports = router;