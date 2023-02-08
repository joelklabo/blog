export default function handler(req, res) {
	const { user } = req.query
	res.status(200).json({name: user})
}