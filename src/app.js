//connect to mongodb,adds security,json parsing and cookie support


require('dotenv').config()
const express=require('express');
const helmet=require('helmet');
const cookieParser=require('cookie-parser');
const connectDB=require('./config/db');

const app=express();

connectDB();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server running on port ${PORT}'));
