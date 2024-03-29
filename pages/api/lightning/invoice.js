import NextCors from "nextjs-cors";
import LightningRPC from "@/lib/lightning/rpc";

export default async function handler(req, res) {
	const rpc = new LightningRPC(`${process.env.LIGHTNING_RPC}`);

	const body = JSON.parse(req.body);

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	const millisatoshi = Math.round(body.amount * 1000);

	await rpc.invoice(millisatoshi, body.description).then((bolt11) => {
		res.status(200).json({ bolt11: bolt11 });
	}).catch((error) => {
		res.status(400).json({ error: "Failed to create invoice" });
	});
}
