import { Request, Response } from "express";
const express = require('express');
const app = express();
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/userRoutes');
const paypalRouter = require('./routes/paypalRoutes');
app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/pay', paypalRouter);

app.get('/', (req: Request, res:Response) => res.sendFile(__dirname + "/index.html"));


module.exports = app;
