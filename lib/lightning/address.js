import LightningRPC from "./rpc";

export default function LightningAddress() {

	this.rpc = new LightningRPC(`${process.env.LIGHTNING_RPC}`);
	
	this.metadata = [
		['text/identifier', `joel@${process.env.BASE_URL}`],
		['text/plain', `Send sats to joel@${process.env.BASE_URL}`]
	]

	this.metadataString = JSON.stringify(this.metadata); 

	this.initialResponse = {
		"tag": "payRequest",
		"minSendable": 10000,
		"maxSendable": 400000000,
		"commentAllowed": 50,
		"callback": `https://${process.env.BASE_URL}/api/lnurlp/invoice`,
		"metadata": this.metadataString 
	}

	this.invoice = function(msatoshi, callback) {
		this.rpc.invoice(msatoshi, this.metadataString, (response) => {
			callback(response?.result?.bolt11);
		});
	}
}