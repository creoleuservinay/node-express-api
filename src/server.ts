const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

if( typeof process.env.DATABASE != 'undefined' && typeof process.env.DATABASE_PASSWORD != 'undefined' ){
    const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {});