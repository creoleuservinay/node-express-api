import User from "../models/userModal";
import { UserInterface } from "../interface/user-interface";
import JSONResponse from "../libs/json-responses";
import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcrypt');

class AuthenticationController {

  singToken = (id: String) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

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

      return JSONResponse.success(req, res, 200, 'Registration successfully', newUser, newUser.length, token);
    } catch (error) {
      return JSONResponse.serverError(req, res, 400, 'Something went wrong!!', {});
    }
  };

  loggingIn = async (req: Request, res: Response, next: NextFunction) => {
    const logInData = req.body;
    const {email, password} = req.body;
    if(!email || !password){
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }
    
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (isPasswordMatching) {
        const token = this.singToken(user._id);
        user.password = undefined;
        user.passwordConfirm = undefined;
        return JSONResponse.success(req, res, 200, 'Signup successfully', user, 1, token);
      } else {
        return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
      }
    } else {
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }

    console.log('Outside');
  }

  protectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Get the token and check the token.
    let token = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }
    
    // // Varification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    if(!decoded){
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }
    // Check if user still exists.
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
      return JSONResponse.serverError(req, res, 401, 'Unauthorished', {});
    }
    // If user change password.

    next();
  }
}

const authController = new AuthenticationController();

export default { authController };