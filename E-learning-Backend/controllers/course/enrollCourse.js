const Student = require('../../models/studentSchema');
const Course = require('../../models/courseSchema');

const isCourseAlreadyEnrolled = async (userId, courseId) => {
    const enrolledStudent = await Student.findOne({
        $and: [
            { _id: userId },
            { ongoingCourses: courseId }
        ]
    });
    if (enrolledStudent) {
        throw {
            success: false,
            message: 'You have already enrolled in this course'
        }
    }
}

const enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user._id;
        await isCourseAlreadyEnrolled(userId, courseId);
        await Student.findByIdAndUpdate(userId,
            { $push: { ongoingCourses: courseId } }
        );
        await Course.findByIdAndUpdate(courseId, { 
            $inc: { numEnrolledStudents: 1 }, 
            $push: { enrolledStudents: userId }
        });
        res.status(200).json({
            success: true,
            message: 'Course enrolled successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = enrollCourse;