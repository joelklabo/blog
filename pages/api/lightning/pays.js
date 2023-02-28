import NextCors from "nextjs-cors";
import LightningRPC from "@/lib/lightning/rpc";
import { KeysendType, NostrType, PaidInvoice, TipType } from "@/models/paidInvoice";
import UsernameCache from "@/lib/util/usernameCache";
import query from "@/lib/nostr/query";
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

	await rpc.invoices()
		.then( async (invoices) => {
		const paidInvoices = invoices.filter((invoice) => {
			return invoice.status === 'paid';
		})
		.map((invoice) => {
			return PaidInvoice(invoice, usernameCache);
		})
		.reverse();

		// Filter out invoices that aren't tips
		const onlyTipInvoices = paidInvoices.filter((invoice) => {
			return invoice.type === NostrType || invoice.type === TipType || invoice.type === KeysendType;
		});

		// Find all invoices with a NostrType that don't have a username
		const missingUsernames = onlyTipInvoices.filter((invoice) => {
			return invoice.type === NostrType && !invoice.username;
		});
			
		if (missingUsernames.length > 0) {
			console.log('Fetching usernames for ' + missingUsernames.length + ' invoices...')

			const pubkeys = missingUsernames.map((invoice) => {
				return invoice.pubkey;
			});

			const events = await query(missingUsernames.length, [0], pubkeys); 
			console.log('Fetched ' + events.length + ' usernames.')

			events.forEach((event) => {
				const content = event.content
				const json = JSON.parse(content)
				const username = json.display_name || json.name
				// check if username is undefined or null
				if (username) {
					usernameCache.set(event.pubkey, username);
				}
			});

			console.log('Done fetching usernames.')
			console.log('Returning ' + paidInvoices.length + ' invoices.')
			res.status(200).json({ paidInvoices: onlyTipInvoices});
	
		} else {
			res.status(200).json({ paidInvoices: onlyTipInvoices});
		}

	}).catch((error) => {
		res.status(400).json({ error: "Failed to get invoices" });
	});
}