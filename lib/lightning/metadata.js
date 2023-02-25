export default class Metadata {
	
	metadata = [
		['text/identifier', `joel@${process.env.BASE_URL}`],
		['text/plain', `Send sats to joel@${process.env.BASE_URL}`]
	]

	metadataString = JSON.stringify(this.metadata); 

	initialResponse = {
		"tag": "payRequest",
		"minSendable": 1000,
		"maxSendable": 400000000,
		"commentAllowed": 50,
		"callback": `https://${process.env.BASE_URL}/api/lnurlp/invoice`,
		"metadata": this.metadataString,
		allowsNostr: true,
		nostrPubkey: process.env.NOSTR_PUBKEY
	}
}