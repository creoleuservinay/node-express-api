const mongoose = require('mongoose');
const { Schema } = mongoose;

const tourSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Must have name'],
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Must have price']
    },
    description: {
        type: String,
        trim: true
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;