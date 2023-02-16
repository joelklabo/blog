import NextCors from 'nextjs-cors'
import LightningAddress from '@/lib/lightning/address'

export default async function handler(req, res) {

	console.log("HERE");
	const lnAddress = new LightningAddress();

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	console.log("lnAddress.initialResponse: ", lnAddress.initialResponse);
	res.status(200).json(lnAddress.initialResponse);
}