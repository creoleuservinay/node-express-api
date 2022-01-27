import { Schema, model, connect } from 'mongoose';
import { UserInterface } from '../interface/user-interface';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Schema for tour.
const UserSchema = new Schema({
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
    lowercase: true,
  },
  role: {
    type: String,
    enum:  ['admin', 'guide', 'lead-guid', 'user'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Must have password'],
    minLength: 8
  },
  passwordConfirm: {
    type: String,
    require: [true, 'Must have confirm password']
  },
  publishedTour: [{
    type: Schema.Types.ObjectId,
    ref: 'Tour'
 }]
});
const User = mongoose.model('User', UserSchema);

//  Exporting modal class for global use.
export default User;