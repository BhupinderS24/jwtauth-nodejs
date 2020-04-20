const express= require('express');
const app= express();
const logger = require('./logger/logger.js');
const mongoose = require('mongoose');
require('dotenv').config();
var cookieParser = require('cookie-parser');



var mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB , {useNewUrlParser: true});
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',req.headers.origin);
    res.header(
        "Access-Control-Allow-Headers",
        '*'
    );
    res.header('Access-Control-Allow-Credentials','true');
    // res.header('Access-Control-Allow-Methods','*');
    if(req.method==='OPTIONS'){

        res.header('Access-Control-Allow-Headers','*');
        res.header('Access-Control-Allow-Origin',req.headers.origin);
        res.header('Access-Control-Allow-Credentials','true');
        // res.header(
        //     "Access-Control-Allow-Headers",
        //     "*"
        // );
        // res.header('Access-control-Allow-Origin','http://localhost:4200');
        return res.status(200).json({});
    }
    next();
})

app.use(cookieParser());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use('/chatcord', require('./routes/authentication.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log("Server started on port"+PORT);
})




























