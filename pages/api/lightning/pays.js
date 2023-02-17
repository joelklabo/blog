import NextCors from "nextjs-cors";
import LightningRPC from "@/lib/lightning/rpc";

export default async function handler(req, res) {
	const rpc = new LightningRPC(`${process.env.LIGHTNING_RPC}`);

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	await rpc.invoices().then((invoices) => {
		const paidInvoices = invoices.filter((invoice) => {
			return invoice.status === 'paid';
		}).reverse();
		res.status(200).json({ paidInvoices: paidInvoices });
	}).catch((error) => {
		res.status(400).json({ error: "Failed to get invoices" });
	});
}