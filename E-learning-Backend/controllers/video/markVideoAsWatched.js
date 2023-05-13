const Video = require("../../models/videoSchema");

const markVideoAsWatched = async (req, res) => {
    try {
        if(req.user.watchedVideos.includes(req.params.videoId)) {
            return res.status(200).send({
                success: true,
                message: 'Video already watched'
            });
        }
        req.user.watchedVideos.push(req.params.videoId);
        await req.user.save();
        await Video.findByIdAndUpdate(req.params.videoId, {
            $push: {
                watchedUsers: req.user._id
            }
        });
        res.status(200).send({
            success: true,
            message: 'Video marked as watched'
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = markVideoAsWatched;