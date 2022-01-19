import { Schema, model, connect } from 'mongoose';
import { UserInterface } from '../interface/user-interface';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Schema for tour.
const userSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Must have name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Must have Email'],
      unique: true,
      trim: true,
      lowercase:true,
    },
    password: {
        type: String,
        required: [true, 'Must have password'],
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        require:[true, 'Must have confirm password']
    }
  });

//   userSchema.pre('save', function(next){
//     if( !this.isModified('password') ) return next();
//     next();
//   });
  
  const User = mongoose.model('User', userSchema);
  
  //  Exporting modal class for global use.
  export default User;