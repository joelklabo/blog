import LightningRPC from "./lightningRpc";

export default function LightningAddress() {

	this.rpc = new LightningRPC(process.env.LIGHTNING_RPC);
	
	this.metadataString = "[[\"text/identifier\",\"joel@klabo.blog\"],[\"text/plain\",\"Send sats to joel@klabo.blog\"]]"

	this.initialResponse = {
		"tag": "payRequest",
		"minSendable": 1000,
		"maxSendable": 400000000,
		"commentAllowed": 50,
		"callback": "https://klabo.blog/api/lnurlp/invoice",
		"metadata": this.metadataString 
	}

	this.invoice = function(msatoshi, callback) {
		this.rpc.invoice(msatoshi, this.metadataString, (response) => {
			callback(response?.result?.bolt11);
		});
	}
}