const Student=require('../models/Student');

//to get all the students
const getStudents=async(req,res)=>{
    try{
        const students=await Student.find();
        res.json(students);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//to add a new student
const addStudent=async(req,res)=>{
    try{
        const student=new Student(req.body);
        await student.save();
        res.status(201).json(student);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

module.exports={getStudents,addStudent};
