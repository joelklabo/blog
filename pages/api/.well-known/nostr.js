export default function handler(req, res) {
	const response = {"names":
		{
			"joel": "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2",
			"_": "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2" 
		}
	}
	res.status(200).json(response)
}