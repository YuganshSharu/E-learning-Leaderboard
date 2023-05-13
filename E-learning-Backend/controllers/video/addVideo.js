const Video = require('../../models/videoSchema');
const Course = require('../../models/courseSchema');

const addVideo = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const video = new Video({
            ...req.body,
            course: courseId
        });
        const newVideo = await video.save();
        await Course.findByIdAndUpdate(courseId, {
            $push: {
                videos: newVideo._id
            }
        });
        res.status(200).json({
            success: true,
            message: 'Video added successfully'
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = addVideo;