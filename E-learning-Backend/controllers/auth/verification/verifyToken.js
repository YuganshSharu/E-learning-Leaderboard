const Token = require('../../../models/tokenSchema');
const User = require('../../../models/userSchema');
const ErrorHandler = require('../../../utilities/error/errorHandler');

const setUserVerification = async (userId) => {
    try {
        await User.findByIdAndUpdate(userId, { verified: true });
    } catch (err) {
        throw new ErrorHandler(err.message, 500);
    }
}

const matchToken = async (token, userId) => {
    try {
        const tokenRecord = await Token.findOne({ token, userId });
        if (!tokenRecord) {
            return false;
        }
        await tokenRecord.remove();
        return true;
    } catch (err) {
        throw new ErrorHandler(err.message, 500);
    }
}

const getUserVerification = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user?.verified;
    } catch (err) {
        throw new ErrorHandler(err.message, 500);
    }
}

const verifyToken = async (req, res) => {
    try {
        const { id: userId, token } = req.query;
        const isUserAlreadyVerified = await getUserVerification(userId);
        if (isUserAlreadyVerified) {
            return res.status(200).json({
                success: true,
                message: 'User is already verified'
            })
        }
        const isVerified = await matchToken(token, userId);
        if (isVerified) {
            setUserVerification(userId);
            res.status(200).json({
                success: true,
                message: 'Email verified successfully'
            });
        } else {
            throw new ErrorHandler('Invalid Verification Attempt', 400);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = verifyToken;