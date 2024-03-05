import { NextFunction, Response, Request } from "express";
import { Token } from "../../../app/types/auth/Token";

/**
 * Middleware to validate the token and refresh it if it's expired
 */
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
            res.cookie('signedin', true)
            res.cookie('token', newToken, cookieConfig)
        }
        next();
    } catch (error) {
        res.clearCookie('token');
        res.clearCookie('signedin');
        res.status(401).redirect('/login');
    }
}

/**
 * Refresh the token
 */
async function refreshToken(refreshToken: string) {
    const paramaters = {
        client_id: process.env["OAUTH_APPLICATION_ID"],
        client_secret: process.env["OAUTH_SECRET"],
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
    }
    const url = new URL('https://gitlab.lnu.se/oauth/token')
    url.search = new URLSearchParams(paramaters as OAuthParamaters).toString()

    const response = await fetch(url.toString(), {
        method: 'POST',
    })
    const data = await response.json()
    return data
}

/**
 * Check if the token is expired
 */
function isExpired(token: Token) {
    const now = Date.now() / 1000;
    const expiry = token.created_at + token.expires_in;
    return now > expiry;
}

type OAuthParamaters = {
    client_id: string,
    client_secret: string,
    refresh_token: string,
    grant_type: string,
}