const User = require('../models/userSchema');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromUrlQueryParameter('token'),
    ExtractJwt.fromBodyField('token'),
  ]),
};

const onJWTStrategy = (jwtPayload, next) => {
  try {
    return next(null, jwtPayload.user);
  } catch (err) {
    return next(err, false);
  }
};

passport.use(new JwtStrategy(options, onJWTStrategy));

const JwtVerification = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      // Status Codes and Error Handling
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }
      req.user = await User.findById(user._id);
      next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  })(req, res, next);
};

module.exports = JwtVerification;
