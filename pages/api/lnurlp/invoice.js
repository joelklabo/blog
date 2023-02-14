import LNBits from 'lnbits';

const { wallet } = LNBits({
  adminKey: process.env.LNBITS_ADMIN_KEY,
  invoiceReadKey: process.env.LNBITS_INVOICE_KEY,
  endpoint: 'https://lnbits.klabo.blog',
});

export default async function handler(req, res) {
	const newInvoice = await wallet.createInvoice({
		amount: req.query.amount,
		memo: "Description: ${Date.now()}",
		out: false,
	})
	const repsonse = {
		"pr": newInvoice.payment_request,
		"routes": []
	}
	res.status(200).json(repsonse)
}