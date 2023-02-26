const {RelayPool} = require('nostr')

const damus = "wss://relay.damus.io"
const klabo = "wss://nostr.klabo.blog"
const relays = [damus]

export async function query(limit, kinds, authors) {
	const pool = new RelayPool(relays)
	return new Promise((resolve, reject) => {
		pool.on('open', relay => {
			relay.subscribe('subid', {limit: limit, kinds: kinds, authors: authors})
		})
		pool.on('eose', relay => {
			relay.close()
			reject()
		})
		pool.on('event', (relay, sub_id, ev) => {
			resolve(ev)
		})
	})
}
