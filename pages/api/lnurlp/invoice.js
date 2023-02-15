import NextCors from 'nextjs-cors';
import LightningAddress from '@/lib/lightningAddress';


export default async function handler(req, res) {

	const lnAddress = new LightningAddress();

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})
	
	lnAddress.invoice(req.query.amount, (response) => {
		console.log(res);
		const payload = {
			"pr": response.result.bolt11,
			"routes": []
		}
		res.status(200).json(payload)
	});
}