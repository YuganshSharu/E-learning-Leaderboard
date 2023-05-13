require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const axios = require('axios');

const apiRoutesList = require('./api/routesList');
const rankDefaultValues = require('./rankAll');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().array());

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  const docLink =
    'https://documenter.getpostman.com/view/21200099/VUqpswvY#ef9022af-8681-49f3-91b1-1147614e2c2e';
  res.send(`Welcome to E-Learning. Go to ${docLink} to see the documentation.`);
});

app.use(apiRoutesList.SIGNUP.path, require(apiRoutesList.SIGNUP.directory));
app.use(apiRoutesList.LOGIN.path, require(apiRoutesList.LOGIN.directory));
app.use(
  apiRoutesList.VERIFY_MAIL.path,
  require(apiRoutesList.VERIFY_MAIL.directory)
);
app.use(apiRoutesList.STUDENT.path, require(apiRoutesList.STUDENT.directory));
app.use(apiRoutesList.COURSE.path, require(apiRoutesList.COURSE.directory));
app.use(apiRoutesList.VIDEO.path, require(apiRoutesList.VIDEO.directory));
app.use(apiRoutesList.NOTE.path, require(apiRoutesList.NOTE.directory));
app.use(
  apiRoutesList.LEADERBOARD.path,
  require(apiRoutesList.LEADERBOARD.directory)
);
// To make all rank in defalut incresing order
rankDefaultValues();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
