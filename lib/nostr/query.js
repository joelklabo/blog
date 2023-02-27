const {RelayPool} = require('nostr')

const damus = "wss://relay.damus.io"
const relays = [damus]

export default async function query(limit, kinds, authors) {
	console.log('query', limit, kinds, authors)
	const pool = new RelayPool(relays)
	return new Promise((resolve, reject) => {
		let events = []
		pool.on('open', relay => {
			relay.subscribe('subid', {limit: limit, kinds: kinds, authors: authors})
		})
		pool.on('eose', relay => {
			resolve(events)
			relay.close()
		})
		pool.on('event', (relay, sub_id, ev) => {
			events.push(ev)
		})
	})
}
