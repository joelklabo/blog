const { Username } = require('./query');

export default async function NostrUsername(pubkey) {
	// read in a json file called usernames.json
	const usernames = readJsonFile('usernames.json');

	// check usernames.json entry matching pubkey
	if (usernames[pubkey]) {
		return usernames[pubkey]
	}
}
