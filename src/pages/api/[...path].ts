// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as API from "../../utils/api-server";
import logger from "../../logs/logger"

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

const cookieString = (cookies: any) => {
    return Object.entries(cookies||{}).map((entry: any)=>`${entry[0]}=${entry[1]};`).join(' ')
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (!req.url) {
        res.status(500).json({ message: 'No URL' })
        return
    }
    logger.info(`Request to ${req.url}`)
    const url = req.url.replace(/\/$/, '')
    if (req.method === 'GET') {
        return API.get(url, {headers: { Cookie: cookieString(req.cookies) }}).then((result) => {
            return res.status(result.status).setHeader('Set-Cookie', (result.headers['set-cookie']||[]).join(' ')).json(result.data)
        })
    } else if (req.method === 'POST') {
        return API.post(url, req.body, {headers: { Cookie: cookieString(req.cookies) }}).then((result) => {
            return res.status(result.status).json(result.data)
        })
    }
}
