const Student = require('../../models/studentSchema');

const getAllStudentDetails = async (req, res) => {
  try {
    // Student.updateMany({}, { $unset: { rank: '' } });
    const students = await Student.find({});
    // console.log(students);
    students.sort(function (a, b) {
      return a.rank < b.rank ? -1 : 1;
    });
    res.status(200).json({
      success: true,
      students,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getAllStudentDetails;
