const Student =  require('../models/studentSchema');
const Professor =  require('../models/professorSchema');

const roleSelector = (role) => {
    switch(role) {
        case 'student':
            return Student;
        case 'professor':
            return Professor;
        default:
            return Student;
    }
}

module.exports = roleSelector;