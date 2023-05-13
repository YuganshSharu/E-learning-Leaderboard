const Course = require('../../models/courseSchema');
const Video = require('../../models/videoSchema');

const getOngoingCourses = async (req, res) => {
    try {
        const userOngoingCoursesIds = req.user.ongoingCourses;
        const userWatchedVideosIds = req.user.watchedVideos;
        const userOngoingCourses = await Course.find({
            _id: {
                $in: userOngoingCoursesIds
            }
        }).populate('creator', 'fullName');
        const userWatchedVideos = await Video.find({
            _id: {
                $in: userWatchedVideosIds
            }
        });
        const courseProgressMap = new Map();
        userOngoingCourses.forEach(course => {
            courseProgressMap.set(String(course._id), {
                _id: course._id,
                title: course.title,
                progress: 0,
                numWatchedVideos: 0,
                watchedVideos: [],
                numVideosInCourse: course.videos.length,
                creator: course.creator,
                numEnrolledStudents: course.numEnrolledStudents
            });
        });
        userWatchedVideos.forEach(video => {
            const courseProgress = courseProgressMap.get(String(video.course));
            courseProgress.watchedVideos.push(video);
            courseProgress.numWatchedVideos += 1;
        });
        for (const [courseId, courseProgress] of courseProgressMap) {
            if(courseProgress.numVideosInCourse === 0) {
                courseProgress.progress = 0;
            } else {
                courseProgress.progress = courseProgress.numWatchedVideos * 100 / courseProgress.numVideosInCourse;
            }

        }
        const ongoingCourses = Array.from(courseProgressMap.values());

        res.status(200).json({
            success: true,
            courses: ongoingCourses
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = getOngoingCourses;