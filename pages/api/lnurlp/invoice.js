import NextCors from 'nextjs-cors';
import LightningAddress from '@/lib/lightning/address';


export default async function handler(req, res) {

	const lnAddress = new LightningAddress();

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	if (!req.query.amount) {
		res.status(400).json({ error: "Missing amount" });
		return;
	}

	if (req.query.amount < 1000) {
		res.status(400).json({ error: "Amount too low" });
		return;
	}

	if (req.query.amount > 100000000) {
		res.status(400).json({ error: "Amount too high" });
		return;
	}

	const query = req.query;

	await lnAddress.invoice(query.amount, query.nostr).then((bolt11) => {
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