import NextCors from 'nextjs-cors';
import LightningAddress from '@/lib/lightningAddress';


export default async function handler(req, res) {

	const lnAddress = new LightningAddress();

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})
	
	if (typeof req.query.amount === 'number') {
		lnAddress.invoice(req.query.amount, (response) => {
			if (typeof response.result.bolt11 === 'string') {
				const payload = {
					"pr": response.result.bolt11,
					"routes": []
				}
				res.status(200).json(payload)
			} else {
				res.status(400).json({ error: "Failed to create invoice" });
			}
		});
	} else {
		res.status(400).json({ error: "Amount is required" });
	}
}