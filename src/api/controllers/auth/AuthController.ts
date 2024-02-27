import { NextFunction, Request, Response } from "express";
import env from '../../../../env.json'

export class AuthController {
    public async authenicate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { code } = req.query
    
        const paramaters = {
        client_id: env.AUTH.OAUTH_APPLICATION_ID,
        client_secret: env.AUTH.OAUTH_KEY,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${req.protocol}://${req.headers.host}/${env.AUTH.REDIRECT_URI}`,
        }
    
        const url = new URL('https://gitlab.lnu.se/oauth/token?')
        url.search = new URLSearchParams(paramaters as any).toString()
    
        const response = await fetch(url.toString(), {
        method: 'POST',
        })
        const data = await response.json()
        console.log(data);
    
        res.redirect('/profile') 
    }
}