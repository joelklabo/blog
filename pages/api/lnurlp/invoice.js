import LNBits from 'lnbits';
import NextCors from 'nextjs-cors';

const { wallet } = LNBits({
  adminKey: process.env.LNBITS_ADMIN_KEY,
  invoiceReadKey: process.env.LNBITS_INVOICE_KEY,
  endpoint: 'https://lnbits.klabo.blog',
});

export default async function handler(req, res) {

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})
	console.log(req.query)
	const newInvoice = await wallet.createInvoice({
		amount: req.query.amount / 1000,
		memo: `Description: ${Date.now()}`,
		out: true,
	})
	console.log(newInvoice)
	const repsonse = {
		"pr": newInvoice.payment_request,
		"routes": []
	}
	res.status(200).json(repsonse)
}