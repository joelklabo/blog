import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";

export default function CreateInvoice({ LNURL }) {

	const [bolt11, setBolt11] = useState();

	const createInvoice = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const amount = data.get("amount");
		const description = data.get("description");

		const response = await fetch('/api/lightning/invoice', {
			method: "POST",
			body: JSON.stringify({
				amount: amount,
				description: description
			}),
		});

		const json = await response.json();
		setBolt11(json.bolt11);
		resetForm();
	};

	function resetForm() {
		document.getElementById("create-invoice-form").reset();
	}
	
	
	return (
		<>
			<div className="max-w-md py-12 m-auto">
				<h1 className="text-3xl font-bold mb-4">Leave a tip</h1>
				<form id="create-invoice-form" className="mb-6" onSubmit={createInvoice}>
					<div className="flex flex-col mb-4">
						<label className="mb-2 uppercase font-bold text-grey-darkest" htmlFor="amount">Amount (in satoshis)</label>
						<input className="border py-2 px-3 text-grey-darkest" type="number" name="amount" id="amount" />
					</div>
					<div className="flex flex-col mb-4">
						<label className="mb-2 uppercase font-bold text-grey-darkest" htmlFor="description">Message</label>
						<input className="border py-2 px-3 text-grey-darkest" type="text" name="description" id="description" placeholder="Leave a message and I'll put in on my leaderboard" />
					</div>
					<div className="flex flex-col mb-6 py-6">
						<button className="block bg-yellow-300 hover:bg-yellow-400 uppercase text-lg mx-auto p-4 rounded" type="submit">Create Invoice</button>
					</div>
				</form>
				{ bolt11 ? ( 
				<QRCodeCanvas className="m-auto" value={bolt11} classNameName="m-auto" />
				) : (<></>)}
			</div>
		</>
	)
}
