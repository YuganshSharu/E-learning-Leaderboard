const isEmailVerified = (req, res, next) => {
  if (true || (req.user && req.user.verified)) {
    next();
  } else {
    res.status(401).json({
      success: false,
      name: 'EmailUnverified',
      message: 'Email not verified',
    });
  }
};

module.exports = isEmailVerified;
