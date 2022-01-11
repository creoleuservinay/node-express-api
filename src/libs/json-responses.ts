import { Request, Response } from "express";
import { Module } from "module";

class JSONResponse {
    static success(req: Request, res: Response, statusCode: number, message: string, data: object) {
        res.status(statusCode).json({
            status: "Success",
            code: statusCode,
            message: message || 'success',
            data: data,
        });
    }

    static serverError(req: Request, res: Response, statusCode: number, message: string, data: object) {
        res.status(statusCode).json({
            status: "Fail",
            code: statusCode,
            message: message || 'internal server error',
            data: data,
        });
    }
}
export default JSONResponse;