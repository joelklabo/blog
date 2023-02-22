import NextCors from 'nextjs-cors'
import LightningAddress from '@/lib/lightning/address'
import Metadata from '@/lib/lightning/metadata';

export default async function handler(req, res) {

	const lnAddress = new LightningAddress();
	const metadata = new Metadata();

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	res.status(200).json(metadata.initialResponse);
}