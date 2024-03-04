import { NextFunction, Request, Response } from "express";
import env from '../../../../env.json'

/**
 * Authentication controller
 */
export class AuthController {
    /**
     * Authenticate user with GitLab
     */
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
        grant_type: env.AUTH.GRANT_TYPE, 
        redirect_uri: env.AUTH.REDIRECT_URI,
        }
    
        const url = new URL('https://gitlab.lnu.se/oauth/token')
        url.search = new URLSearchParams(paramaters as any).toString()
    
        const response = await fetch(url.toString(), {
        method: 'POST',
        })
        const data = await response.json()

        const cookieConfig = {
            httpOnly: true,
            maxAge: 1000000,
            signed: true
        }

        res.cookie('token', data, cookieConfig)
        res.cookie('signedin', true)
    
        res.redirect('/') 
    }

    /**
     * Destroy user session
     */
    public async logout(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        res.clearCookie('token');
        res.clearCookie('signedin');
        res.status(200).json({message: 'Logged out successfully!'});

    }
}