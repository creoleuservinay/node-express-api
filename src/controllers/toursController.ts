import { Request, Response } from 'express';
import JSONResponse from '../libs/json-responses';
import Tour from "../models/tourModel";

class RouteManager {

  getAllTours = async (req: Request, res: Response) => {
  try {
    const allTours = await Tour.find({});
    JSONResponse.success(req, res, 200, 'Tours', allTours);
  } catch (error) {
    JSONResponse.success(req, res, 400, 'No result found!!', {});
  }
};

createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);
    JSONResponse.success(req, res, 200, 'Tour created successfully', newTour);
  } catch (error) {
    JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
  }
};

deleteTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Tour.deleteOne({ _id: id });
    JSONResponse.success(req, res, 200, 'Tour deleted successfully', {});
  } catch (error) {
    JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
  }
};

updateTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    JSONResponse.success(req, res, 200, 'Tour Updated successfully', tour);
  } catch (error) {
    JSONResponse.serverError(req, res, 400, 'Something went wrong please check input', {});
  }
};

getTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getTour = await Tour.findById(id);
    JSONResponse.success(req, res, 200, 'Tour data found', getTour);
  } catch (error) {
    JSONResponse.serverError(req, res, 400, 'Something went wrong!', {});
  }
};
}

const routeManager = new RouteManager();

export default { routeManager };