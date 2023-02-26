const path = require('path');
import UsernameCache from '../../lib/util/usernameCache';

const dataPath = path.join(__dirname, '../data/usernames.json');
const pubkey = "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2"
const emptyPubkey = "test"
const username = "joel"
const testUsername = "test person"
const cache = new UsernameCache(dataPath);

describe('NostrUsername', () => {
	it('returns a username', () => {
		expect(cache).toBeDefined();
		expect(cache.get(pubkey)).toBe(username);
	})
	it('saves a username', () => {
		expect(cache.get(emptyPubkey)).toBeUndefined();
		cache.set(emptyPubkey, testUsername);
		expect(cache.get(emptyPubkey)).toBe(testUsername);
	})
	afterAll(() => {
		cache.delete(emptyPubkey);
	})
})