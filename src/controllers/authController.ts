import User from "../models/userModal";
import { UserInterface } from "../interface/user-interface";
import JSONResponse from "../libs/json-responses";
import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcrypt');

class AuthenticationController {

  singToken = (id: String) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }
  getUsers = async (req: Request, res: Response) => {
    try {
      const data = await User.find()
        .populate({ path: 'publishedTour', select: 'name' });
      res.status(200).json({ success: true, data });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }


  singUp = async (req: Request, res: Response): Promise<object> => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const userData = req.body;

      const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });

      const token = this.singToken(newUser._id);
      return JSONResponse.success(req, res, 200, 'Registration successfully', newUser, 1, token);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
    }
  };

  loggingIn = async (req: Request, res: Response, next: NextFunction) => {
    const logInData = req.body;
    const { email, password } = req.body;
    if (!email || !password) {
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }

    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        const token = this.singToken(user._id);
        user.password = undefined;
        user.id = undefined;
        user.passwordConfirm = undefined;
        res.cookie('jwt',token, { httpOnly: true, secure: false, maxAge: 3600000 });
        return JSONResponse.success(req, res, 200, 'Signup successfully', user, 1, token);
      } else {
        return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
      }
    } else {
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }
  }

  logOut = async(req:Request, res: Response) => {
    res.cookie('jwt', '', {expires: new Date(1), path: '/' });
    return JSONResponse.success(req, res, 200, 'Success', {});
  }

  protect = async (req: Request, res: Response, next: NextFunction) => {
    // Get the token and check the token.
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }

    //  Varification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    if (!decoded) {
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }
    // Check if user still exists.
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }
    // If user change password.

    next();
  }

  restrictTo = (req: Request, res: Response, next: NextFunction) => {
    next();
    // return (req:Request,res: Response, next: NextFunction)=> {
    //   if(!roles.includes(req.user.role)){
    //     return new Error('Not authorishhed');
    //   } else {

    //   }
    // }
  };
}

const authController = new AuthenticationController();

export default { authController };