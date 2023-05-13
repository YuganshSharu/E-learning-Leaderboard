const Course = require('../../models/courseSchema');

const getCourseEnrollments = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const result = await Course
        .findById(courseId, ['enrolledStudents', 'videos'])
        .populate('enrolledStudents', ['fullName', 'email', 'watchedVideos']);

        res.status(200).json({
            success: true,
            students: result.enrolledStudents,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }

}

module.exports = getCourseEnrollments;