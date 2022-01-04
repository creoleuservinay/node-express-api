const express = require("express");
const fs = require("fs");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status : "Success",
        data: {
            tours
        }
    });
});