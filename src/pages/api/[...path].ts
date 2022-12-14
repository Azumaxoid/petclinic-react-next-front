// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as API from "../../utils/api-server";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (!req.url) {
        res.status(500).json({ message: 'No URL' })
        return
    }
    const url = req.url.replace(/\/$/, '')
    if (req.method === 'GET') {
        return API.get(url).then((result) => {
            return res.status(result.status).json(result.data)
        })
    } else if (req.method === 'POST') {
        return API.post(url, req.body).then((result) => {
            return res.status(result.status).json(result.data)
        })
    }
}
