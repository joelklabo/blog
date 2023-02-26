import { readJsonFile, writeJsonFile } from "./readJsonFile";

export default class UsernameCache {
	constructor(path) {
		this.dataPath = ''
		if (path) {
			this.dataPath = path;
		} else {
			this.dataPath.join(process.cwd(), 'data/nostr/usernames.json');
		}
		this.usernames = readJsonFile(this.dataPath);
	}

	get(pubkey) {
		if (this.usernames[pubkey]) {
			return this.usernames[pubkey];
		}
	}

	set(pubkey, username) {
		this.usernames[pubkey] = username;
		writeJsonFile(this.usernames, this.dataPath);
	}

	delete(pubkey) {
		delete this.usernames[pubkey];
		writeJsonFile(this.usernames, this.dataPath);
	}
}