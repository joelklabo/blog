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

	this.invoice = function(msatoshi, description, callback) {
		const params = {
			"msatoshi": msatoshi,
			"label": crypto.randomBytes(16).toString("hex"),
			"description": description,
			"deschashonly": true
		};
		this.log("Creating invoice", params);
		this.call("invoice", params, callback);
	}

	this.log = function(message) {
		const prefix = "[⚡️ LightningRPC]";
		console.log(prefix);
		console.log(message);
	}


	this.socket.on('data', (data) => {
		const response = JSON.parse(data.toString());
		if (this.currentCallback) {
			this.currentCallback(response);
			this.log(response);
		}
	});

	function openSocketConnection(path) {
		const socket = net.createConnection(path, () => {
			this.log('connected to server!');
		})
		return socket;
	}
}