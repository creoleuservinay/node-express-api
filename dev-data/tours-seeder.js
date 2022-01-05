const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(con => { });


const importData = async () => {
    const fs = require('fs');
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
    try {
        await Tour.create(tours);
        process.exit();
    } catch (error) {
        console.log('Something went wrong', error);
        process.exit();
    }
}

const cleanToursData = async () => {
    try {
        await Tour.deleteMany();
        process.exit();
    } catch (error) {
        console.log('Something went wrong');
        process.exit();
    }
};

if( process.argv[2] === '--import' ){
    importData();
} else if( process.argv[2] === '--delete' ) {
    cleanToursData();
}