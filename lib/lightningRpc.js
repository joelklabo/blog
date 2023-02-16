import net from 'net'; 
import crypto from 'crypto';

export default function LightningRPC(path) {

	this.path = path;
	this.socket = openSocketConnection(path);

	this.call = function(method, params, callback) {
		this.currentCallback = callback;
		const id = crypto.randomBytes(16).toString("hex");
		this.socket.write(JSON.stringify({jsonrpc: "2.0", method: method, params: params, id: id}));
	}

  this.invoice = function(msatoshi, description) {
		return new Promise((resolve, reject) => {
			const params = {
				"msatoshi": msatoshi * 1000,
				"label": crypto.randomBytes(16).toString("hex"),
				"description": description,
				"deschashonly": true
			};
			console.log("Creating invoice", params);
			this.call("invoice", params, (response, error) => {
				if (error || response?.result?.bolt11 === 'undefined') {
					console.log("Error creating invoice", error)
					reject(error);
				} else {
					const bolt11 = response?.result?.bolt11;
					console.log("Invoice created:\n", bolt11);
					resolve(bolt11);
				}
			});
		});
	}

	this.socket.on('data', (data) => {
		const response = JSON.parse(data.toString());
		if (this.currentCallback) {
			this.currentCallback(response);
		}
	});

	function openSocketConnection(path) {
		const socket = net.createConnection(path, () => {
			console.log('connected to server!');
		})
		return socket;
	}
}