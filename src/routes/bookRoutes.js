const express = require('express');
const { getBooks,addBook}=require('../controllers/bookController');
const router = express.Router();

//to get all the books
router.get('/', getBooks);

//to add a new book
router.post('/', addBook);
module.exports = router;