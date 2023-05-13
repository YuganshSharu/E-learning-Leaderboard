const Course = require("../../models/courseSchema");
const mongoose = require("mongoose");
const Video = require("../../models/videoSchema");

const getCourseVideos = async (req, res) => {
    try {
        const userWatchedVideos = req.user.watchedVideos;
        const userWatchedVideosSet = new Set();
        if(userWatchedVideos) {
            userWatchedVideos.forEach(video => {
                userWatchedVideosSet.add(String(video));
            });
        }
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId).populate('videos', ['_id', 'title', 'duration', 'lectureNumber', 'videoNumber']).populate('creator', 'fullName');
        const videosMap = new Map();
        const videos = []
        for(const video of course.videos) {
            videos.push({
                _id: video._id,
                title: video.title,
                duration: video.duration,
                lectureNumber: video.lectureNumber,
                videoNumber: video.videoNumber,
                watched: userWatchedVideosSet.has(String(video._id))
            });
        }

        videos.forEach(video => {
            if(videosMap.has(video.lectureNumber)) {
                videosMap.get(video.lectureNumber).push(video);
            } else {
                videosMap.set(video.lectureNumber, [video]);
            }
        });

        res.status(200).json({
            success: true,
            _id: course._id,
            title: course.title,
            description: course.description,
            creator: course.creator,
            videos: Object.fromEntries(videosMap)
        });
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = getCourseVideos;