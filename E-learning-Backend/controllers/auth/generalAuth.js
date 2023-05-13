const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../../models/userSchema');
const ErrorHandler = require('../../utilities/error/errorHandler');

passport.use(User.createStrategy());

const getJwtToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign({ user: payload }, process.env.JWT_SECRET);
    return token;
}

const generalAuth = async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    try {
        if (!userEmail || !userPassword) {
            throw new ErrorHandler('Missing Credentials', 401);
        }
        const { user, error: err } = await User.authenticate()(userEmail, userPassword);
        if (err) {
            throw new ErrorHandler(err.message, 500);
        } else if (!user) {
            throw new ErrorHandler('Something went wrong', 500);
        } else {
            const token = getJwtToken(user);
            res.status(200).json({
                success: true,
                token,
                role: user.__t,
                verified: true
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = generalAuth;