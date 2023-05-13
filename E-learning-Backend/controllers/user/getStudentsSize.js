const Student = require('../../models/studentSchema');

const getStudentsSize = async (req, res) => {
  try {
    Student.countDocuments()
      .then((count_documents) => {
        // console.log(count_documents);
        res.status(200).json({
          success: true,
          count_documents,
        });
      })
      .catch((err) => {
        // console.log(err.Message);
        res.status(500).send(err.Message);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getStudentsSize;
