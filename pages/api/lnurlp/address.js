import NextCors from 'nextjs-cors'
import LightningAddress from '@/lib/lightningAddress'

export default async function handler(req, res) {

	const lnAddress = new LightningAddress();

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	res.status(200).json(lnAddress.initialResponse);
}