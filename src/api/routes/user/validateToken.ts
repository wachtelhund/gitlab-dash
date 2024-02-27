import { NextFunction, Response, Request } from "express";
import { Token } from "../../../app/types/auth/Token";
import env from '../../../../env.json'

export async function validateToken (
        req: Request,
        res: Response,
        next: NextFunction
) {
    try {
        const tokenCookie = req.signedCookies.token as Token;
        
        if (isExpired(tokenCookie)) {
            const refreshTokenString = tokenCookie.refresh_token;
            const newToken = await refreshToken(refreshTokenString);
            const cookieConfig = {
                httpOnly: true,
                maxAge: 1000000,
                signed: true
            }
            res.cookie('token', newToken, cookieConfig)
        }
        next();
    } catch (error) {
        console.log(error);
        res.clearCookie('token');
        res.status(401).send('Unauthorized');
    }
}

async function refreshToken(refreshToken: string) {
    const paramaters = {
        client_id: env.AUTH.OAUTH_APPLICATION_ID,
        client_secret: env.AUTH.OAUTH_KEY,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
    }
    const url = new URL('https://gitlab.lnu.se/oauth/token')
    url.search = new URLSearchParams(paramaters as any).toString()

    const response = await fetch(url.toString(), {
        method: 'POST',
    })
    const data = await response.json()
    return data
}

function isExpired(token: Token) {
    const now = Date.now() / 1000;
    const expiry = token.created_at + token.expires_in;
    return now > expiry;
}