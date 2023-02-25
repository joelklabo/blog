import Metadata from "../lib/lightning/metadata";

export const PaidInvoice = (invoice, metadata) => {

	const amount = invoice.msatoshi / 1000;
	const date = invoice.paid_at;

	const description = (function () {
		try {
			const json = JSON.parse(invoice.description);
			if (json.pubkey) {
				return `⚡️ Zap from ${json.pubkey}`;
			} else if (invoice.description === metadata.metadataString) {
				return "⚡️ Tip";
			} else {
				console.log(invoice)
				console.log(metadata.metadataString)
			}
		} catch (error) {
			// Do nothing, not a zap
		}
		return invoice.description;
	})();

	return {date: date, description: description, amount: amount};
}