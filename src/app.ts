import { Request, Response } from "express";
const express = require('express');
const app = express();
const tourRouter = require('./routes/toursRoutes');
app.use(express.json());
app.use('/api/v1/tours', tourRouter);
app.get('/api/welcome', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello' });
});

module.exports = app;
