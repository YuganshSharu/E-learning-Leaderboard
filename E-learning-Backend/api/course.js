const express = require('express');
const getOngoingCourses = require('../controllers/course/getOngoingCourses');
const JwtVerification = require('../middleware/auth');
const isEmailVerified = require('../middleware/isEmailVerified');
const addCourse = require('../controllers/course/addCourse');
const getAllCourses = require('../controllers/course/getAllCourses');
const getRemainingCourses = require('../controllers/course/getRemainingCourses');
const enrollCourse = require('../controllers/course/enrollCourse');
const getCourseVideos = require('../controllers/course/getCourseVideo');
const roleVerify = require('../middleware/roleVerify');
const getProfessorCourses = require('../controllers/course/getProfessorCourses');
const getCourseEnrollments = require('../controllers/course/getCourseEnrollments');
const router = express.Router();

// /api/course
router.get('/', JwtVerification, isEmailVerified, getAllCourses);

router.get('/my-courses', JwtVerification, isEmailVerified, roleVerify(['Professor']), getProfessorCourses);

router.get('/my-course/enrollments/:courseId', JwtVerification, isEmailVerified, roleVerify(['Professor']), getCourseEnrollments);

router.get('/')

// /api/course/ongoing
router.get('/ongoing', JwtVerification, isEmailVerified, getOngoingCourses);

router.get('/remaining', JwtVerification, isEmailVerified, getRemainingCourses);

router.get('/:courseId', JwtVerification, isEmailVerified, getCourseVideos);

//TODO: Add Middleware for Professor
// /api/course
router.post('/', JwtVerification, isEmailVerified, roleVerify(['Professor']), addCourse);

// /api/course/:courseId
router.patch('/enroll/:courseId', JwtVerification, isEmailVerified, enrollCourse);

module.exports = router;