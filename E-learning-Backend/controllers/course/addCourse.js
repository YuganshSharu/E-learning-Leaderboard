const Course = require('../../models/courseSchema');
const Professor = require('../../models/professorSchema');

const checkDuplicateCourse = async (user, course) => {
    const existingCourse = await Course.findOne({
        $and: [
            {creator: user._id},
            {title: course.title}
        ]
    });
    if(existingCourse) {
        throw {
            success: false,
            message: 'You have already created a course with this title'
        }
    }
}

const addCourse = async (req, res) => {
    try {
        const newCourseDetails = Course.extractFields(req.body);
        newCourseDetails.creator = req.user._id;
        Course.validateFields(newCourseDetails);
        await checkDuplicateCourse(req.user, newCourseDetails);
        const newCourse = new Course(newCourseDetails);
        const createdCourse = await newCourse.save();
        await Professor.findByIdAndUpdate(req.user._id, {
            $push: {
                myCourses: createdCourse._id
            }
        });
        res.status(200).json({
            success: true,
            message: 'Course added successfully'
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = addCourse;