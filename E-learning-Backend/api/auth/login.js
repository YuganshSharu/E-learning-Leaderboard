const express = require('express');
const router = express.Router();
const generalAuth = require('../../controllers/auth/generalAuth');

router.post('/', (req, res) => {
    generalAuth(req, res);
});

module.exports = router;