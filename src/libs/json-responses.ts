import { Request, Response } from "express";

class JSONResponse {
    static success(req: Request, res: Response, statusCode: number, message: string, data: object, totalcount: number) {
        return res.status(statusCode).json({
            status: "Success",
            code: statusCode,
            count:totalcount | 0,
            message: message || 'success',
            data: data,
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
}
export default JSONResponse;