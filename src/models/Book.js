const mongoose = require('mongoose');

const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    availability:{
        type:String,
        enum:['Available','Borrowed'],
        default:'Available'
    }
},{
    timestamps:true
}
);

module.exports=mongoose.model('Book',BookSchema);