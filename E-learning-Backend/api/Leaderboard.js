const express = require('express');
const getAllStudentDetails = require('../controllers/user/getAllStudentDetails');
const getAllCourses = require('../controllers/course/getAllCourses');
const JwtVerification = require('../middleware/auth');
const isEmailVerified = require('../middleware/isEmailVerified');
const router = express.Router();
router.get('/', JwtVerification, isEmailVerified, getAllStudentDetails);
module.exports = router;
