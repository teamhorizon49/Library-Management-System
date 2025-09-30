const BorrowRecord=require('../models/BorrowRecord');
const Book=require('../models/Book');

//to get all borrowed books
const getBorrowRecords=async(req,res)=>{
    try{
        const records=await BorrowRecord.find().populate('book student');
        res.json(records);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//to borrow a book
const borrowBook=async(req,res)=>{
try{
    const{studentId,bookId}=req.body;
    const record=new BorrowRecord({
        student:studentId,
        book:bookId,
        borrowedAt:new Date()
    });
    await record.save();

    res.status(201).json(record);
}catch(err){
    res.status(400).json({message:err.message});
}
};

//to return a book
const returnBook=async(req,res)=>{
    try{
        const{recordId}=req.body;
        const record=await BorrowRecord.findById(recordId);

        if(!record) return res.status(404).json({message:'Record not found'});

        record.returnedAt=new Date();
        await record.save();

        res.json(record);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};

module.exports={getBorrowRecords,borrowBook,returnBook};