import { Schema, model, connect } from 'mongoose';
import { TourInterface } from '../interface/tour-interface';
const mongoose = require('mongoose');

// Schema for tour.
const tourSchema = new Schema<TourInterface>({
  name: {
    type: String,
    required: [true, 'Must have name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Must have price'],
  },
  description: {
    type: String,
    trim: true,
  },
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
 }
});

const Tour = mongoose.model('Tour', tourSchema);

//  Exporting modal class for global use.
export default Tour;