const mongoose = require('mongoose');

//created a usermodel which will draw the data from database in the form of schema given below
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    pagesize:Number,
    location:String,
    bookmarkdata: [
        {
            title:String,
            author:String,
            imagesrc:String,
            link:String,
            description:String
        }
    ]      
})

const userModel = mongoose.model("dummyuser",userSchema);

module.exports=  userModel;