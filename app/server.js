const express= require('express');
const app= express();
const logger = require('./logger/logger.js');
const mongoose = require('mongoose');
require('dotenv').config();




var mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB , {useNewUrlParser: true});


app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.header('Access-control-Allow-Origin','*');
    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );
    res.header('Access-Control-Allow_Credentials',true);
    res.header('Access-Control-Allow-Methods','*');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/chatcord', require('./routes/authentication.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log("Server started on port"+PORT);
})




























