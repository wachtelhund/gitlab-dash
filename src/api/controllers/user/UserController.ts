import { Request, Response } from "express";
import { GLGroupsResponse } from "../../../app/types/user/groupStruct";

/**
 * User controller
 */
export class UserController {
    /**
     * Get the profile
     */
    public async getProfile(
        req: Request,
        res: Response,
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

    /**
     * Get the activities
     */
    public async getActivities(
        req: Request,
        res: Response,
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

    /**
     * Get the group projects
     */
    public async getGroupProjects(
        req: Request,
        res: Response,
    ) {
        const token = req.signedCookies.token.access_token;

        // GraphQL query
        const graphqlQuery = {
        query: `{
            currentUser {
                username
                groups(first: 4) {
                    nodes {
                        name
                        webUrl
                        avatarUrl
                        fullPath
                        projects(first: 6) {
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
        if ((data as GLGroupsResponse).data.currentUser.groups.nodes.length > 3) {
            data.data.currentUser.groups.hasMore = true;
        }
        for (const group of (data as GLGroupsResponse).data.currentUser.groups.nodes) {
            if (group.projects.nodes.length > 5) {
                group.projects.hasMore = true;
            }
        }
        res.send(data);
    }
}
