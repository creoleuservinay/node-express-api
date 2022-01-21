import { Request, Response } from "express";

class JSONResponse {
    static success(req: Request, res: Response, statusCode: number, message: string, data: object, totalcount: number, token?: String) {
        return res.status(statusCode).json({
            status: "Success",
            code: statusCode,
            count:totalcount | 0,
            message: message || 'success',
            data: data,
            token: token
        });
    }

    static serverError(req: Request, res: Response, statusCode: number, message: string, data: object) {
        return res.status(statusCode).json({
            status: "Fail",
            code: statusCode,
            message: message || 'internal server error',
            data: data,
        });
    }

    static unhandledError(req: Request, res: Response, statusCode: number, message: string,) {
        return res.status(statusCode).json({
            status: "Fail",
            code: statusCode,
            message: message || 'internal server error',
        });
    }
}
export default JSONResponse;