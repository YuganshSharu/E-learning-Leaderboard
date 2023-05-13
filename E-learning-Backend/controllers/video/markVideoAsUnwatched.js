const Video = require("../../models/videoSchema");

const markVideoAsUnwatched = async (req, res) => {
    try {
        req.user.watchedVideos = req.user.watchedVideos.filter(video => 
            String(video) !== req.params.videoId
        );
        await req.user.save();
        await Video.findByIdAndUpdate(req.params.videoId, {
            $pull: {
                watchedUsers: req.user._id
            }
        });
        res.status(200).send({
            success: true,
            message: 'Video marked as unwatched'
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

module.exports = markVideoAsUnwatched;