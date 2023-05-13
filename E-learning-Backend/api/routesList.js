const apiRoutesList = {
  SIGNUP: {
    directory: './api/auth/signup',
    path: '/api/auth/signup',
  },
  LOGIN: {
    directory: './api/auth/login',
    path: '/api/auth/login',
  },
  VERIFY_MAIL: {
    directory: './api/auth/verify',
    path: '/api/auth/verify/mail',
  },
  STUDENT: {
    directory: './api/student',
    path: '/api/student',
  },
  COURSE: {
    directory: './api/course',
    path: '/api/course',
  },
  VIDEO: {
    directory: './api/video',
    path: '/api/video',
  },
  NOTE: {
    directory: './api/note',
    path: '/api/note',
  },
  LEADERBOARD: {
    directory: './api/leaderboard',
    path: '/api/leaderboard',
  },
};

module.exports = apiRoutesList;
