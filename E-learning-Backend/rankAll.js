const Student = require('./models/studentSchema');

const rankDefaultValues = async () => {
  const students = await Student.find({});
  // console.log(students);
  students.sort(function (a, b) {
    return a.coins > b.coins ? -1 : 1;
  });
  const n = students.length;

  for (let i = 0; i < n; i++) {
    if (i < n / 3) {
      await Student.updateOne(
        { _id: students[i]._id },
        {
          $set: {
            rank: i + 1,
            badge: 'gold',
          },
        }
      );
    } else if (i < (2 * n) / 3) {
      await Student.updateOne(
        { _id: students[i]._id },
        {
          $set: {
            rank: i + 1,
            badge: 'silver',
          },
        }
      );
    } else {
      await Student.updateOne(
        { _id: students[i]._id },
        {
          $set: {
            rank: i + 1,
            badge: 'bronze',
          },
        }
      );
    }
  }
};

module.exports = rankDefaultValues;
