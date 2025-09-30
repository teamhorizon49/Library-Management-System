const express=require('express');
const {borrowBook,returnBook,getBorrowRecords}=require('../controllers/borrowController');
const router=express.Router();

//borrow a bbok
router.post('/borrow',borrowBook);
//return a book
router.post('/return',returnBook);
//get all borrow records
router.get('/',getBorrowRecords);
module.exports=router;