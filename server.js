const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(con => { 
        console.log('Connect successfully!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});