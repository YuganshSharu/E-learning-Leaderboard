const express = require('express');
const getOngoingCourses = require('../controllers/course/getOngoingCourses');
const getStudentDetails = require('../controllers/user/getStudentDetails');
const getAllStudentDetails = require('../controllers/user/getAllStudentDetails');
const JwtVerification = require('../middleware/auth');
const isEmailVerified = require('../middleware/isEmailVerified');
const getStudentsSize = require('../controllers/user/getStudentsSize');
const updateStudentCoin = require('../controllers/user/updateStudentCoin');
const router = express.Router();

// /api/student
router.get('/', JwtVerification, isEmailVerified, getStudentDetails);
router.get('/size', JwtVerification, isEmailVerified, getStudentsSize);
router.patch(
  '/change-coin/:keyword',
  JwtVerification,
  isEmailVerified,
  updateStudentCoin
);
module.exports = router;
