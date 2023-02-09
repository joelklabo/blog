export default function handler(req, res) {
	const { user } = req.query
	const response = {
		"callback": "https://klabo.blog/api/lurlp/invoice",
		"maxSendable": 400000000,
		"minSendable": 1000,
		"metadata": "[[\"text/identifier\",\"joel@klabo.blog\"],[\"text/plain\",\"Send sats to joel@klabo.blog\"]]",	
		commentAllowed: 500,
		tag: "payRequest"
	}
	res.status(200).json(response)
}