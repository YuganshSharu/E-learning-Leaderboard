const Video = require('../../models/videoSchema');

const getVideos = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const video = await Video.findById(videoId);
        video.relatedVideos.sort((a, b) => {
            return b.weight - a.weight;
        });
        const topRecommendations = video.relatedVideos.slice(0, 3);
        const topRecommendationsIds = topRecommendations.map(video => {
            return String(video.video);
        });
        let recommendations = await Video.find({
            _id: {
                $in: topRecommendationsIds
            }
        }, ['url', 'title', 'course']);
        let numberOfVideos = recommendations.length;
        let videoNumber = video.videoNumber;
        const sequenceVideos = [];
        while(numberOfVideos < 4) {
            videoNumber++;
            const nextVideo = await Video.findOne({
                course: video.course,
                videoNumber: videoNumber
            }, ['url', 'title', 'course']);
            if(nextVideo) {
                sequenceVideos.push(nextVideo);
                numberOfVideos++;
            } else {
                break;
            }
        }
        recommendations = sequenceVideos.concat(recommendations);
        const resultVideo = {
            _id: video._id,
            title: video.title,
            description: video.description,
            url: video.url,
            recommendations: recommendations
        };
        res.status(200).json({
            success: true,
            video: resultVideo
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = getVideos;