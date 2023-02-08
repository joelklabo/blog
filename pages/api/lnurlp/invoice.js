import LNBits from 'lnbits';

const { wallet } = LNBits({
  adminKey: process.env.LNBITS_ADMIN_KEY,
  invoiceReadKey: process.env.LNBITS_INVOICE_KEY,
  endpoint: 'https://lnbits.klabo.blog',
});

export default async function handler(req, res) {
	console.log(req)
	const newInvoice = await wallet.createInvoice({
		amount: 10,
		memo: 'test',
		out: false,
	})
	const repsonse = {
		"pr": newInvoice.payment_request
	}
	res.status(200).json(repsonse)
}