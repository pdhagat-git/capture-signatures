import {
    createHandler,
    Post,
    Request,
  } from "next-api-decorators";
import axios from "axios";

const webhookUrl = process.env.WEBHOOK_URL
if(!webhookUrl) {
    throw Error('Webhook URL not configured, please add it in the ENV')
}

class WebhookHandler {
    @Post()
    public async createWalletEntries(@Request() req: Request) {
        try {
            const data = await axios.post(webhookUrl??'', req.body)           
            return data
        } catch {
        }
    }
}
  
export default createHandler(WebhookHandler);