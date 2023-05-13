const Course = require('../../models/courseSchema');
const Professor = require('../../models/professorSchema');

const getProfessorCourses = async (req, res) => {
    try {
        const result = await Professor.findById(req.user._id, ['myCourses']).populate('myCourses');
        res.status(200).json({
            success: true,
            courses: result.myCourses
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Error'
        });
    }

}

module.exports = getProfessorCourses;