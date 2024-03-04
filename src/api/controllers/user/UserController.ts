import { NextFunction, Request, Response } from "express";
import env from '../../../../env.json'
import { ParsedQs } from "qs";

export class UserController {
    public async getProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const token = req.signedCookies.token.access_token;
        const url = new URL('https://gitlab.lnu.se/api/v4/user')
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        res.send(data);
    }

    public async getActivities(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const token = req.signedCookies.token.access_token;
        
        const url = new URL('https://gitlab.lnu.se/api/v4/events')
        url.search = new URLSearchParams({
            per_page: req.query['per_page'] as string,
            page: req.query['page'] as string
        }).toString()
        
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = await response.json()
        const header = response.headers.get('x-total') ? response.headers.get('x-total') : 0
        res.header('X-Total-Count', header?.toString())
        
        res.send(data);
    }

    public async getGroupProjects(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const token = req.signedCookies.token.access_token;

        // Fetch
        const graphqlQuery = {
        query: `{
            currentUser {
                username
                groups(first: 3) {
                    nodes {
                        name
                        webUrl
                        avatarUrl
                        fullPath
                        projects(first: 5) {
                            nodes {
                                name
                                webUrl
                                avatarUrl
                                fullPath
                                repository {
                                    tree {
                                        lastCommit {
                                            author {
                                                avatarUrl
                                                name
                                                webUrl
                                            }
                                            committedDate
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                }
            }`
        }

        const url = new URL('https://gitlab.lnu.se/api/graphql')
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        })
        const data = await response.json()
        res.send(data);
    }
}
