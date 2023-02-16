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
		"minSendable": 1000,
		"maxSendable": 400000000,
		"commentAllowed": 50,
		"callback": `https://${process.env.BASE_URL}/api/lnurlp/invoice`,
		"metadata": this.metadataString 
	}

	this.invoice = async function(msatoshi) {
		return new Promise((resolve, reject) => {
			this.rpc.invoice(msatoshi, this.metadataString).then((bolt11) => {	
				resolve(bolt11);
			}).catch((error) => {
				console.log("Error creating invoice", error)
				reject(error);
			});
		});
	}
}