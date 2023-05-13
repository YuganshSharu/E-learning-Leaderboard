const express = require('express');
const router = express.Router();
const generalSignup = require('../../controllers/auth/generalSignup');

router.post('/', (req, res) => {
    generalSignup(req, res);
});

module.exports = router;