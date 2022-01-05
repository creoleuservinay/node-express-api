const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


//Middleware
if(process.env.NODE_ENV === 'developement'){
    app.use(morgan("dev"));
}


app.use(express.json());
app.use((req, res, next) => {
    console.log('Hello i am from middleware');
    next();
});




//Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;