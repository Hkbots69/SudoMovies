const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    passwd:{
        type:String,
        require: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    coin:{
        type: Number,
        default: 50.50
    }
  });
  const User = mongoose.model('user',UserSchema);
  User.createIndexes();
  module.exports = User;