export const NostrType = 'nostr';
export const TipType = 'tip';
export const KeysendType = 'keysend';
export const DefaultType = 'default';

export const PaidInvoice = (invoice, usernameCache) => {

	const result = {};
	const amount = invoice.msatoshi / 1000;
	const date = invoice.paid_at;
	const message = invoice.description;

	try {
		const json = JSON.parse(invoice.description);
		if (json.pubkey) {
			result.type = NostrType;
			result.pubkey = json.pubkey;
			result.amount = amount;
			result.date = date;
			result.message = message;
			if (usernameCache.get(json.pubkey)) {
				result.username = usernameCache.get(json.pubkey);
			}
			return result;
		}
	} catch (error) {
		// Do nothing, not a zap
	}

	if (invoice.description.includes("text/identifier")) {
		result.type = TipType;
		result.amount = amount; 
	} else if (invoice.description.includes("keysend")) {
		result.type = KeysendType;
		result.amount = invoice.msatoshi_received / 1000;
	} else {
		result.type = DefaultType;
		result.amount = amount; 
	}
	
	result.date = date;
	result.message = message;
	
	return result;
}