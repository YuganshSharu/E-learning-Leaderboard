const Course = require('../../models/courseSchema');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('creator');
        res.status(200).json({
            success: true,
            courses
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = getAllCourses;