import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ethers } from "ethers";

const webhookUrl = process.env.WEBHOOK_URL;
if (!webhookUrl) {
	throw Error("Webhook URL not configured, please add it in the ENV");
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (!(req.method === "POST")) {
		return res.status(404).send({ message: "Not Found" });
	}

	const { walletAddress, email, signature } = req.body;
	if (!(email && signature && walletAddress)) {
		return res.status(400).send({ message: "missing arguments" });
	}

	if (!ethers.utils.isAddress(walletAddress)) {
		return res.status(400).send({ message: "invalid wallet address" });
	}

	const message = JSON.stringify({
		walletAddress,
		email,
	});

	try {
		const recoveredAddress = ethers.utils.verifyMessage(message, signature);
		if (recoveredAddress !== walletAddress) {
			return res.status(403).send({ message: "signature verfication failed" });
		}
	} catch (error) {
		return res.status(403).send({ message: "signature verfication failed" });
	}

	const response = await axios.post(webhookUrl ?? "", req.body);
	return res.status(200).json(response.data);
}
