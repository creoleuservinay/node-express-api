import { request, Request, Response } from 'express';
import JSONResponse from '../libs/json-responses';
import Tour from "../models/tourModel";
import { TourInterface } from '../interface/tour-interface';
import { Error } from 'mongoose';
const jwt = require('jsonwebtoken');
import User from '../models/userModal';
const fs = require('fs');
class TourController {

  getAllTours = async (req: Request, res: Response): Promise<object> => {
    try {
      //const allTours = await Tour.find({});

      const allTours = await Tour.find()
        .populate({ path: 'publisher', select: 'name email' });

      return JSONResponse.success(req, res, 200, 'Tours', allTours, allTours.length);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'No result found!!', {});
    }
  };

  getUser = function (req: Request, res: Response) {
    if (req.headers && req.headers.authorization) {
      let authorization = req.headers.authorization.split(' ')[1],
        decoded;
      try {
        decoded = jwt.verify(authorization, process.env.JWT_SECRET);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      return decoded.id;

    }
    return res.send(500);
  }

  createTour = async (req: Request, res: Response): Promise<object> => {
    try {

      const tourData: TourInterface = req.body;
      const userId: any = this.getUser(req, res);

      const newTour = await Tour.create({
        name: tourData.name,
        price: tourData.price,
        publisher: userId
      });
      // const newTour = new Tour(tourData);
      // newTour.publisher = userid;
      // await newTour.save();

      /**
        * 1. Find the user User ID.
        * 2. Call Push method on publishedTour key of User.
        * 3. Pass newly created Tour as value.
        * 4. Call save method.
       */
      const user = await User.findById({ _id: newTour.publisher });
      user.publishedTour.push(newTour);
      await user.save();

      return JSONResponse.success(req, res, 200, 'Tour created successfully', newTour, 1);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
    }
  };

  deleteTour = async (req: Request, res: Response): Promise<object> => {
    const { id } = req.params;
    try {
      const delRes = await Tour.deleteOne({ _id: id });
      return JSONResponse.success(req, res, 200, 'Tour deleted successfully', {});
    } catch (error) {
      return JSONResponse.serverError(req, res, 404, 'Something went wrong!!', {});
    }
  };

  updateTour = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedTourData: TourInterface = req.body;
      const tour: TourInterface = await Tour.findByIdAndUpdate(id, updatedTourData, {
        new: true,
      });
      JSONResponse.success(req, res, 200, 'Tour Updated successfully', tour, 1);
    } catch (error) {
      JSONResponse.serverError(req, res, 400, 'Something went wrong please check input', {});
    }
  };

  getTour = async (req: Request, res: Response): Promise<object> => {
    try {
      const { id } = req.params;
      const getTour = await Tour.findById(id)
        .populate({ path: 'publisher', select: 'name email' });

      return JSONResponse.success(req, res, 200, 'Tour data found', getTour, 1);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'Something went wrong!', {});
    }
  };

  importTour = async (req: Request, res: Response) => {
    try {
      const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
      //console.log(`./util/seeders/tours.json`);
      await Tour.create(tours);
      //process.exit();
      return JSONResponse.success(req, res, 200, 'Tour data import success', {}, 1);
    } catch (error: any) {
      return JSONResponse.serverError(req, res, 500, 'Something went wrong!', {});
    }
  }
}

const tourcontroller = new TourController();

export default { tourcontroller };