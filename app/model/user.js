const mongoose = require('mongoose');

const user= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String ,
    email:String ,
    country: String ,
    age:Number,
    password:String
})

module.exports = mongoose.model('User', user);