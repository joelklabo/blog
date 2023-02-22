export default function Metadata() {
	this.metadata = [
		['text/identifier', `joel@${process.env.BASE_URL}`],
		['text/plain', `Send sats to joel@${process.env.BASE_URL}`]
	]

	this.metadataString = JSON.stringify(this.metadata); 

	const nostr = {
		allowsNostr: true,
		nostrPubkey: process.env.NOSTR_PUBKEY,
	}

	this.initialResponse = {
		"tag": "payRequest",
		"minSendable": 1000,
		"maxSendable": 400000000,
		"commentAllowed": 50,
		"callback": `https://${process.env.BASE_URL}/api/lnurlp/invoice`,
		"metadata": this.metadataString,
		...nostr
	}
}