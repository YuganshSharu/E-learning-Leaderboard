const User = require('../../models/userSchema');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const googleOptions = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.CLIENT_URL}/api/auth/google/callback`
};

const onGoogleStrategy = (accessToken, refreshToken, profile, next) => {
    User.findOrCreate(profile, function (err, user) {
        return next(err, user);
    });
}

passport.use(new GoogleStrategy(googleOptions, onGoogleStrategy));

const googleAuth = (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] }) (req, res);
}

const googleAuthCallback = (req, res) => {
    try {
        passport.authenticate('google', (err, user) => {
            try {
                if(err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
                if(!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'User logged in successfully'
                });
            } catch {
                return res.status(500).send(err);
            }
        }) (req, res);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.googleAuth = googleAuth;
exports.googleAuthCallback = googleAuthCallback;