import NextCors from "nextjs-cors";
import LightningRPC from "@/lib/lightning/rpc";
import { PaidInvoice } from "@/models/paidInvoice";
import UsernameCache from "@/lib/util/usernameCache";
const path = require('path');

export default async function handler(req, res) {
	const rpc = new LightningRPC(`${process.env.LIGHTNING_RPC}`);

  const usernameDataPath = path.join(process.cwd(), 'data/nostr/usernames.json');
	const usernameCache = new UsernameCache(usernameDataPath);

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	await rpc.invoices().then((invoices) => {
		const paidInvoices = invoices.filter((invoice) => {
			return invoice.status === 'paid';
		})
		.map((invoice) => {
			return PaidInvoice(invoice, usernameCache);
		})
		.reverse();
		res.status(200).json({ paidInvoices: paidInvoices});
	}).catch((error) => {
		res.status(400).json({ error: "Failed to get invoices" });
	});
}