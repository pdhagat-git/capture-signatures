import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'

const webhookUrl = process.env.WEBHOOK_URL
if(!webhookUrl) {
    throw Error('Webhook URL not configured, please add it in the ENV')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'POST') {
        const response = await axios.post(webhookUrl??'', req.body)    
        res.status(200).json(response.data)
    } else {
        res.status(404)
    }
}