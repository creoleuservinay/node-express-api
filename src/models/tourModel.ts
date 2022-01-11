const mongoosedb = require('mongoose');
const { Schema } = mongoosedb;

// Schema for tour.
const tourSchema = new Schema({
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
});

const Tour = mongoosedb.model('Tour', tourSchema);

//  Exporting modal class for global use.
export default Tour;