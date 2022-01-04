const express = require("express");
const { json } = require("express/lib/response");
const app = express();

app.use(express.json());

const fs = require("fs");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours.json`));

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

//Custom middleware
app.use((req, res, next) => {
    console.log('Hello i am from middleware');
    next();
});
//Callbacks
const getAllTours =
    (req, res) => {
        res.status(200).json({
            status: "Success",
            data: {
                tours
            }
        });
    }


const createTour =
    (req, res) => {
        const bodyData = req.body;
        res.status(200).json({
            status: "Success",
            data: bodyData
        });
    }

const deleteTour =
    (req, res) => {
        const id = req.params.id;

        res.status(200).json({
            message: "Id fetched from url",
            status: "Success",
            id: id
        });
    }

const updateTour =
    (req, res) => {
        const id = req.params.id;

        res.status(200).json({
            message: "Id fetched from url",
            status: "Success",
            id: id
        });
    }

const getTour =
    (req, res) => {
        const id = req.params.id;

        res.status(200).json({
            message: "Id fetched from url",
            status: "Success",
            id: id
        });
    }


//Routes
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);
