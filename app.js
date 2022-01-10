const express = require('express');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get('/api/welcome', (req, res) => {
  res.status(200).send({ message: 'Hello from API' });
});

module.exports = app;
