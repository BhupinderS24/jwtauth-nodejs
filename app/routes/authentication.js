const express = require('express');
const router = express.Router();
const users= require('../model/user.js');
mongoose = require('mongoose');
require('dotenv').config();
var jwt = require('jsonwebtoken');




const bcrypt = require('bcrypt');
const saltRounds=10;
router.post('/signup',(req,res)=>{

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            // Now we can store the password hash in db.

            const user = new users({
                _id: new mongoose.Types.ObjectId(),
                username:req.body.username,
                email:req.body.email,
                country:req.body.country,
                age: req.body.age,
                password: hash
            });
            user.save().then(result=>{
                console.log(result);
                res.status(201).json({
                    createdUser : user
                });
            })
            .catch(err=>console.log(err));
        
        })
        if(err){
            console.log(err);
        }
        });
    });

router.post('/login',(req,res)=>{
    
    users.findOne({username:req.body.username})
    .exec()
    .then(doc=>{
      if(doc){
        bcrypt.compare(req.body.password, doc.password , function(err, result) {
            console.log(err);
            if(result){
                var token = jwt.sign({ 
                    username: req.body.username,
                    exp: Math.floor(Date.now() / 1000) + (2 * 60)
                }, process.env.SECRET_KEY);
                console.log(token);
                res.cookie('token' , token , { maxAge: 900000}).json({token:token});
            }
           else{
                res.status(403).json({err:"Incorrect Password"});
            }
        });
      }
      else{
        res.status(403).json({error:"Incorrect Username"});
      }
        
    })
 
});

router.get('/chat',(req,res)=>{
    if(req.headers){
        const token = req.headers['authorization'];
        jwt.verify(token, process.env.SECRET_KEY,function(err, user) {
            if(user){
                res.status(200).send("Valid Token");
            }
            if(err){
                res.status(403).json({err:err});
            }
            
          });
    }
    else{
        res.status(400).json({error:'Authorization Header Missing'});
    }
    
})
   



   
    

    
module.exports = router;