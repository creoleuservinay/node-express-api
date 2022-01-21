import { NextFunction, Request, Response } from "express";
const express = require('express');
const app = express();
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/userRoutes');
const paypalRouter = require('./routes/paypalRoutes');
import JSONResponse from './libs/json-responses';
app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/pay', paypalRouter);
app.get('/', (req: Request, res:Response) => res.sendFile(__dirname + "/index.html"));

app.all('*', function(req: Request, res: Response, next: NextFunction) {
    JSONResponse.unhandledError(req, res, 404, `Can't found ${req.originalUrl} on this server!`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = 'Server error';
    return res.status(statusCode).json({
        status: "Fail",
        statuscode: statusCode,
        message: message
    });
});


module.exports = app;
