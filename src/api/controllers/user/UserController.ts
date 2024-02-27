import { NextFunction, Request, Response } from "express";
import env from '../../../../env.json'

export class UserController {
    public async getProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
       res.send('profile') 
    }
}
