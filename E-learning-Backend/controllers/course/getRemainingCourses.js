const Course = require('../../models/courseSchema');

const getRemainingCourses = async (req, res) => {
    try {
        const userOngoingCoursesIds = req.user.ongoingCourses;
        const userRemainingCourses = await Course.find({
            _id: {
                $nin: userOngoingCoursesIds
            }
        }).populate('creator', 'fullName');
        res.status(200).json({
            success: true,
            courses: userRemainingCourses
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = getRemainingCourses;