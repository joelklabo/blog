import net from 'net'; 
import crypto from 'crypto';

export default function LightningRPC(path) {

	this.path = path;
	this.socket = openSocketConnection(path);
	this.buffer = '';

	this.call = function(method, params, callback) {
		this.currentCallback = callback;
		const id = crypto.randomBytes(16).toString("hex");
		this.socket.write(JSON.stringify({jsonrpc: "2.0", method: method, params: params, id: id}));
	}

	this.invoices = function() {
		return new Promise((resolve, reject) => {
			this.call("listinvoices", {}, (response, error) => {
				if (error || response?.result?.invoices === 'undefined') {
					console.log("Error getting invoices", error)
					reject(error);
				} else {
					const invoices = response?.result?.invoices;
					resolve(invoices);
				}
			});
		});
	}

  this.invoice = function(msatoshi, description) {
		return new Promise((resolve, reject) => {
			const params = {
				"msatoshi": msatoshi * 1000,
				"label": crypto.randomBytes(16).toString("hex"),
				"description": description,
				"deschashonly": true
			};
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
		this.handleJsonChunks(data, (json) => {
			if (json?.error) {
				this.currentCallback(null, json.error);
			} else {
				this.currentCallback(json);
			}
		});
	});

	this.handleJsonChunks = function (data, onDataComplete) {
		try {
			this.buffer += data.toString();
			let json = JSON.parse(this.buffer);
			onDataComplete(json);
			this.buffer = '';
		} catch (err) {
			// The buffer does not contain a complete JSON object yet, so wait for more data
		}
	}

	function openSocketConnection(path) {
		const socket = net.createConnection(path, () => {
			console.log('Connected to Lightning RPC');
		})
		return socket;
	}
}