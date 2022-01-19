import User from "../models/userModal";
import { UserInterface } from "../interface/user-interface";
import JSONResponse from "../libs/json-responses";
import { Request, Response } from "express";

class UserAuthController {

    singUp = async (req: Request, res: Response): Promise<object> => {
        try {
          const userData = req.body;
          const newUser = await User.create(userData);
          return JSONResponse.success(req, res, 200, 'User created successfully', newUser, newUser.length);
        } catch (error) {
          return JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
        }
      };

      login = async (req: Request, res: Response): Promise<object> => {
        try {
          const userData = req.body;
          const newUser = await User.create(userData);
          return JSONResponse.success(req, res, 200, 'User created successfully', newUser, newUser.length);
        } catch (error) {
          return JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
        }
      };

}

const userAuth = new UserAuthController();
export default userAuth;