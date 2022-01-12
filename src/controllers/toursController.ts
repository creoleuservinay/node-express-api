import { request, Request, Response } from 'express';
import JSONResponse from '../libs/json-responses';
import Tour from "../models/tourModel";
import { TourInterface } from '../interface/tour-interface';

class RouteManager {

  getAllTours = async (req: Request, res: Response): Promise<object> => {
    try {
      const allTours = await Tour.find({});
      return JSONResponse.success(req, res, 200, 'Tours', allTours, allTours.length);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'No result found!!', {});
    }
  };

  createTour = async (req: Request, res: Response): Promise<object> => {
    try {
      const tourData: TourInterface = req.body;
      const newTour = await Tour.create(tourData);
      return JSONResponse.success(req, res, 200, 'Tour created successfully', newTour, newTour.length);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
    }
  };

  deleteTour = async (req: Request, res: Response): Promise<object> => {
    try {
      const { id } = req.params;
      await Tour.deleteOne({ _id: id });
      return JSONResponse.success(req, res, 200, 'Tour deleted successfully', {}, 0);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
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
      const getTour = await Tour.findById(id);
      return JSONResponse.success(req, res, 200, 'Tour data found', getTour, 1);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'Something went wrong!', {});
    }
  };
}

const routeManager = new RouteManager();

export default { routeManager };