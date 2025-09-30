const Book=require('../models/Book');

//to get all the books
const getBooks=async(req,res)=>{
try{
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//to add a new book
const addBook=async(req,res)=>{
    try{
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }    
    };
module.exports={getBooks,addBook};