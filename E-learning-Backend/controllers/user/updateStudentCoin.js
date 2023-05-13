const Student = require('../../models/studentSchema');
const rewardDectory = require('./rewardStructure');
const updateStudentCoin = async (req, res) => {
  try {
    // console.log(req.body.incCoin);
    // console.log(req.user._id);
    // console.log(req.params.keyword);
    // console.log(rewardDectory);
    await Student.findByIdAndUpdate(req.user._id, {
      $inc: { coins: rewardDectory[req.params.keyword] },
    });
    res.status(201).json({
      success: true,
      message: 'Coin is updated successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = updateStudentCoin;
