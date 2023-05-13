const roleSelector = require('../roleSelector');
const validatePassword = require('../../utilities/validation/password');
const getStudentsSize = require('../user/getStudentsSize');
const Student = require('../../models/studentSchema');

const registerUser = async (UserRole, newUser, password) => {
  return await UserRole.register(newUser, password);
};

const generalSignup = async (req, res) => {
  try {
    const { password: userPassword, role } = req.body;
    validatePassword(userPassword);
    const UserRole = roleSelector(role);
    const newUser = UserRole.extractFields(req.body);
    UserRole.validateFields(newUser);
    await registerUser(UserRole, newUser, userPassword);
    if (role === 'student') {
      let count = 0;
      await Student.countDocuments().then((count_documents) => {
        count = count_documents;
      });
      //   console.log(count);
      await Student.findOneAndUpdate(
        { email: newUser.email },
        {
          $set: { rank: count },
        }
      );
    }
    res.status(201).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = generalSignup;
