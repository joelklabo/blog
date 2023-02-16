import NextCors from 'nextjs-cors';
import LightningAddress from '@/lib/lightning/address';


export default async function handler(req, res) {

	const lnAddress = new LightningAddress();

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})
	
	await lnAddress.invoice(req.query.amount).then((bolt11) => {
		const payload = {
			"pr": bolt11,
			"routes": []
		}
		res.status(200).json(payload);
	}).catch((error) => {
		console.log("LA Invoice creation failed:\n", error);
		res.status(400).json({ error: "Failed to create invoice" });
	});
}