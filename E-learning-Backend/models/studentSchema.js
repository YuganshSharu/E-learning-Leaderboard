const mongoose = require('mongoose');
const User = require('./userSchema');
const studentSchema = new mongoose.Schema({
  ongoingCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  watchedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
  coins: {
    type: Number,
    default: 0,
  },
  profilePicture: {
    type: String,
  },
  rank: {
    type: Number,
    default: 0,
  },
  badge: {
    type: String,
    default: 'bronze',
  },
});

const Student = User.discriminator('Student', studentSchema);

studentSchema.statics.extractFields = (allFields) => {
  const userFields = User.extractFields(allFields);
  return {
    ...userFields,
  };
};

module.exports = Student;
