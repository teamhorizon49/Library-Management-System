const mongoose = require('mongoose');

const BookRecordSchema=new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    borrowToken:{
        type:String,
        required:true,
        unique:true
    },
    borrowDate:{
        type:Date,
        default:Date.now,
    },
    returnDate:{
        type:Date
    }
},{
    timestamps:true

});
module.exports=mongoose.model('BorrowRecord',BookRecordSchema);