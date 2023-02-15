import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { FormEvent } from "react";

export default function CreateInvoice({ LNURL }) {

	const [bolt11, setBolt11] = React.useState();

	const createInvoice = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const amount = data.get("amount");
		const invoice = await fetch(`/api/lnurlp/invoice?amount=${amount}`, {
			method: "GET"
		});
		setBolt11(await invoice.json().result.bolt11);
	}
	
	return (
		<>
		{ bolt11 ? ( 
				<QRCodeCanvas value={bolt11} className="m-auto" />
			) : (
				<div className="text-center">
					<h3 className="text-xl mb-8">Create an invoice</h3>
					<form onSubmit={createInvoice}>
						<input type="text" name="amount" placeholder="Amount in satoshis" required />
						<button type="submit">Create</button>
					</form>
				</div>
				)
			}
		</>
	)
}
