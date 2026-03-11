let students = require("../data/students");

// GET /students
const getStudents = (req, res) => {
    res.json(students);
};

// POST /students
const addStudent = (req, res) => {
    const { id, name, course } = req.body;

    const newStudent = {
        id,
        name,
        course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
};

// DELETE /students/:id
const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    students = students.filter(student => student.id !== id);

    res.json({
        message: "Student deleted successfully"
    });
};

module.exports = {
    getStudents,
    addStudent,
    deleteStudent
};
