import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

	await NextCors(req, res, {
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
		origin: '*',
		optionsSuccessStatus: 200
	})

	const response = {"names":
		{
			"joel": "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2",
			"_": "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2" 
		}
	}
	res.status(200).json(response)
}