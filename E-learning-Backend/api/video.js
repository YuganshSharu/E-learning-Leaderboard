const express = require('express');
const addVideo = require('../controllers/video/addVideo');
const JwtVerification = require('../middleware/auth');
const isEmailVerified = require('../middleware/isEmailVerified');
const markVideoAsWatched = require('../controllers/video/markVideoAsWatched');
const markVideoAsUnwatched = require('../controllers/video/markVideoAsUnwatched');
const getVideos = require('../controllers/video/getVideo');
const router = express.Router();

// /api/video

router.get('/:videoId', JwtVerification, isEmailVerified, getVideos);

router.post('/:courseId', JwtVerification, isEmailVerified, addVideo);

router.patch('/watch/:videoId', JwtVerification, isEmailVerified, markVideoAsWatched);

router.patch('/unwatch/:videoId', JwtVerification, isEmailVerified, markVideoAsUnwatched);

module.exports = router;