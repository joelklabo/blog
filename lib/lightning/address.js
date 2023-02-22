import Metadata from "./metadata";
import LightningRPC from "./rpc";

export default function LightningAddress() {

	this.rpc = new LightningRPC(`${process.env.LIGHTNING_RPC}`);
	this.metadata = new Metadata();
	
	this.invoice = async function(msatoshi) {
		return new Promise((resolve, reject) => {
			this.rpc.invoice(msatoshi, this.metadata.metadataString).then((bolt11) => {	
				resolve(bolt11);
			}).catch((error) => {
				console.log("Error creating invoice", error)
				reject(error);
			});
		});
	}
}