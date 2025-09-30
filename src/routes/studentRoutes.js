const express = require('express');
const { getStudents,addStudent}=require('../controllers/studentController');
const router = express.Router();

//to get all the students
router.get('/', getStudents);
//to add a new student
router.post('/', addStudent);

module.exports=router;