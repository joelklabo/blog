import NextCors from 'nextjs-cors'

export default async function handler(req, res) {

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	const { user } = req.query

	const response = {
		"callback": "https://klabo.blog/api/lnurlp/invoice",
		"maxSendable": 400000000,
		"minSendable": 1000,
		"metadata": "[[\"text/identifier\",\"joel@klabo.blog\"],[\"text/plain\",\"Send sats to joel@klabo.blog\"]]",	
		"commentAllowed": 500,
		"tag": "payRequest",
		"nostrPubKey": "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2",
		"allowsNostr": true
	}
	
	res.status(200).json(response)
}