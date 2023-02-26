import { PaidInvoice, NostrType, TipType, KeysendType, DefaultType } from "../../models/paidInvoice";
import UsernameCache from "../../lib/util/usernameCache";
const path = require('path');

const nostrInvoice = {
	"label": "28355fff963ec8b3dd9f42ab415060e5",
	"bolt11": "lnbc210n1p3lvgv9sp5ascsa9yfjfm84c2nddk4lzmsjtkkse98hxyaxj36hxna4ynjfyyqpp5gj0dw0m80gnq24aaftw3a7xtj0sz9w27rwej3z5r8mwp54mks4mshp5gvgm2vk564w4d8c840d7urdmu65xz6y4q8xpa8lhc2fe9mu65nvsxqyjw5qcqpjrzjqd5rp4ydw3599k78ysud86e4ccy6dp7f3ghwdpf5yq06sfrr3j0e6z76msqq98cqqqqqqqqqqqqqqqqqyg9qyysgqk5p56vqefyea03zdnf3llx90nz0ql7vu6e90xg2t7elna5pg9hqj7ujtqg5r46vh036txsx3hgxymny74j48mt8a7s48f4chxnmxwhcpg6ff74",
	"payment_hash": "449ed73f677a260557bd4add1ef8cb93e022b95e1bb3288a833edc1a57768577",
	"msatoshi": 21000,
	"amount_msat": "21000msat",
	"status": "paid",
	"pay_index": 231,
	"msatoshi_received": 21000,
	"amount_received_msat": "21000msat",
	"paid_at": 1677074828,
	"payment_preimage": "0df3e5bc1fe8896921232e6f3cd67faca36f719a8e96428ad24f5f5b63448fc2",
	"description": "{\"pubkey\":\"3f751c3eeb89898a7bc4946575279e687f27f043bfdcf7fc082f1c21381a49ca\",\"content\":\"\",\"id\":\"565966b8eef7166993de95951b44be3c7b9d90de52751ec724ffab8c82a75b32\",\"created_at\":1677074821,\"sig\":\"124d1127c5c70a9971344203cd1a8e6b74f034581ebc4f20c1290a188bbd7933df2627c3c740ec0ef79e949af14182ae03e1d3239440a5b43350904a307c609f\",\"kind\":9734,\"tags\":[[\"e\",\"fe255b67a14413f391f9fe670b465530119ffad8fcd97bec1d670f2f12f9b572\"],[\"p\",\"2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2\"],[\"relays\",\"wss://relay.damus.io\",\"wss://eden.nostr.land\",\"wss://relay.snort.social\",\"wss://nos.lol\",\"wss://relay.current.fyi\",\"wss://brb.io\",\"wss://nostr.plebchain.org\",\"wss://nostr.oxtr.dev\",\"wss://nostr.uselessshit.co\",\"wss://nostr.milou.lol\"]]}",
	"expires_at": 1677679621
}

const nostrInvoiceNoUsername = {
	"label": "28355fff963ec8b3dd9f42ab415060e5",
	"bolt11": "lnbc210n1p3lvgv9sp5ascsa9yfjfm84c2nddk4lzmsjtkkse98hxyaxj36hxna4ynjfyyqpp5gj0dw0m80gnq24aaftw3a7xtj0sz9w27rwej3z5r8mwp54mks4mshp5gvgm2vk564w4d8c840d7urdmu65xz6y4q8xpa8lhc2fe9mu65nvsxqyjw5qcqpjrzjqd5rp4ydw3599k78ysud86e4ccy6dp7f3ghwdpf5yq06sfrr3j0e6z76msqq98cqqqqqqqqqqqqqqqqqyg9qyysgqk5p56vqefyea03zdnf3llx90nz0ql7vu6e90xg2t7elna5pg9hqj7ujtqg5r46vh036txsx3hgxymny74j48mt8a7s48f4chxnmxwhcpg6ff74",
	"payment_hash": "449ed73f677a260557bd4add1ef8cb93e022b95e1bb3288a833edc1a57768577",
	"msatoshi": 21000,
	"amount_msat": "21000msat",
	"status": "paid",
	"pay_index": 231,
	"msatoshi_received": 21000,
	"amount_received_msat": "21000msat",
	"paid_at": 1677074828,
	"payment_preimage": "0df3e5bc1fe8896921232e6f3cd67faca36f719a8e96428ad24f5f5b63448fc2",
	"description": "{\"pubkey\":\"somepubkey\",\"content\":\"\",\"id\":\"565966b8eef7166993de95951b44be3c7b9d90de52751ec724ffab8c82a75b32\",\"created_at\":1677074821,\"sig\":\"124d1127c5c70a9971344203cd1a8e6b74f034581ebc4f20c1290a188bbd7933df2627c3c740ec0ef79e949af14182ae03e1d3239440a5b43350904a307c609f\",\"kind\":9734,\"tags\":[[\"e\",\"fe255b67a14413f391f9fe670b465530119ffad8fcd97bec1d670f2f12f9b572\"],[\"p\",\"2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2\"],[\"relays\",\"wss://relay.damus.io\",\"wss://eden.nostr.land\",\"wss://relay.snort.social\",\"wss://nos.lol\",\"wss://relay.current.fyi\",\"wss://brb.io\",\"wss://nostr.plebchain.org\",\"wss://nostr.oxtr.dev\",\"wss://nostr.uselessshit.co\",\"wss://nostr.milou.lol\"]]}",
	"expires_at": 1677679621
}

const lightningAddressInvoice = {
	"label": "972f88fa242a857f7803bdca74414a35",
	"bolt11": "lnbc10u1p3lt273sp55tnpf8njh4cndm2mvhc7j060tpk06v5ny0cca4e8xqt6yztv6t9spp5epzg2wyqht5sd6yn9nw66t9xp40gy0xqgq8utwh9jums0vmtnfjqhp5j4m23n94saw5u2r4y26fv27vr67xck2yen6whjstv40dl0gqvkgqxqyjw5qcqpjrzjqd5rp4ydw3599k78ysud86e4ccy6dp7f3ghwdpf5yq06sfrr3j0e6zeckqqq2csqqqqqqqqqqqqqqqqqyg9qyysgq6mye9a84yfjquvfwlqdkwz9fnqf6leglxwax3259mcpyhwypfp9smq9uwd35ejgk8xy2ruu5vx5tan73n63e38aq87x58c2ucmc6cpsqfxlprh",
	"payment_hash": "c844853880bae906e8932cddad2ca60d5e823cc0400fc5bae5973707b36b9a64",
	"msatoshi": 1000000,
	"amount_msat": "1000000msat",
	"status": "paid",
	"description": "[[\"text/identifier\",\"joel@klabo.blog\"],[\"text/plain\",\"Send sats to joel@klabo.blog\"]]",
	"expires_at": 1677649489
}

const normalInvoice = {
	"label": "Wed 08 Feb 2023 08:32:06 PM PST",
	"bolt11": "lnbc10n1p37ga6xsp5mlsgq6eeut9emmutamy54xczhk5e3g6evndsmd6uaccm8a3cc2gqpp5gsuhszfwcr9euyt27vva3whrfewhk60735hj0h3q2sf9khm9aq4sdq4w3jhxapqdehhxarjd9n8jxqyjw5qcqpjrzjqgqamzsw9v9m57eex993edg4k7ym26rplnj9kz3830wv7s6p222wwz7jkcqqfzsqqyqqqqqqqqqqqvsq9q9qyysgqytpam7mwqhr2mxefgxr7auv8x779jrsc8avg0wvleu6q98upfmp4u2plys2cjsv4tas4rryf2rjxmneyrr6evzwc9marhwxp74p76cgqmdgxvl",
	"payment_hash": "443978092ec0cb9e116af319d8bae34e5d7b69fe8d2f27de2054125b5f65e82b",
	"msatoshi": 1000,
	"amount_msat": "1000msat",
	"status": "expired",
	"description": "test nostrify",
	"expires_at": 1676521927
}

const keysendInvoice = {
	"label": "keysend-1677300041.477207080",
	"bolt11": "lnbc1p3lny2fsp5ws8qxq86v8hzcwhdk4sx0rcuvuwg703gztpka4ayke2l2nfsvmuspp5ch396afgldqgutzp95hg0ytkf884hm45qe4suz4ws225hacgq8yqdcvddjhjum9dejr5gzrdpjkx6eqda6hggrd0ysxummyv5sjq4r0deu4xmreyqcryvtzx4skgwpsxumnsdpsxsckyvr9xccnqdrxx3jnvetrxv6k2c3jxy6nvdfev3nrvv35x5mnxepj8qcxzef3vf3xxv3svdnrsvfkvvuzq2zdv9exkgrnv4jkuw3qd3hxyce3xphrzupnd3h8jv3ewpcr2drhwdnnyvmkdvuk6ut6vacn2v3jvumk2ersxfm8sun3v33kcap4vveh5uttxqcxswt9d3exc6r3w9nrwatnv3ex5dm6xpjhyutsw9u8zetwwemhqmncwp48yemhwfuhsafkwfm8wup50pnx57revdjks7r8xee8samj09uxg6nt09mx2drkwekhyuthw3c8scm4wfmkxet98pc8xmnev46rj7rrw4eryan9x4uxwcmj0fjkuupcw9jhyemyxdhrsupnde4x2vm9weekxut6wpnhsutevsuk6mrnwq6hjatrv4erwent0fjkgdnswgc8qep4wdehgdnvdenryerxdd3hzwpn0gek2emdv56xsatpxeu8x7tpv9urqueew9uhjumnw9khvam2v3shvdr3dcukwve4xfmhgemtw93nvancwucrym3ex3e8gmrd8qmku6p5v4jrgmrh0paxvufcdf68sdtewpkkkatrw5ehgatyxd5xcwrndf4hydnjdcehyeredd6kkcmyxasnyut2we6hs6psxpj8jwtt09excut3x56kk7pewq5sxqyjw5qcqpjrzjqfhv8c6rsvy9rxn4efzfdq32ds0z9yt5l092mm43w3cycdm3ztpnzze2dvqqyhsqqyqqqqlgqqqqpjqq9q9qyysgqzpp85vdx7yvtnawm7vth6l0hpn4l36tx6mffkv3gkek0n7d80gahn7f6d0z5j0k0c76u89rz9xnpnvfzq6kygrxkptwvfcecry8vv6sq92x9yl",
	"payment_hash": "c5e25d7528fb408e2c412d2e87917649cf5beeb4066b0e0aae82954bf70801c8",
	"status": "paid",
	"pay_index": 98,
	"msatoshi_received": 10000,
	"amount_received_msat": "10000msat",
	"paid_at": 1677300041,
	"payment_preimage": "3a5b461184fbb32dea932f2e5adccec94caa16459e8456dde385307c0f3da661",
	"description": "keysend: Check out my node! TonySly 021b5ad807784041b0e6104f4e6ec35eb215659df624573d280ae1bbc20cf816c8 (Mark seen: lnbc10n1p3lny29pp54wsg23vk9mqzgq522g7edp2vxrqdclt5c3zqk00h9elrlhqqf7usdrj7z0erqpqxqenvwpnxpjrgwryxu6rvwp4xfjxycehxg6rxwryxdjkyve4vvmrqwtpxcurwcee8psnyet9xcur2ve5xgcrzenp8qergd3n8p3nje3evscqzpgxqyd9mlsp5yucer7fkzed6pr0pd5sst6lnf2dfkcq83z3egme4hua6xsyaax0s9qyyssqmvwjdav4qn9g352wtgkqc6vxw02n94rtlm87nh4ed4lwxzfq8jtx5ypmkucu3tud3hl8sjkr6rn3rdykukcd7a2qjvuxh00dy9kyrlqq55kx9p)",
	"expires_at": 1677904841
}
const dataPath = path.join(__dirname, '../data/usernames.json');
const usernameCache = new UsernameCache(dataPath);
 
describe('Paid Invoice', function() {
	it('should parse nostr type invoices with available username', function() {
		const paidNostrInvoice = PaidInvoice(nostrInvoice, usernameCache);
		expect(paidNostrInvoice).toBeDefined();
		expect(paidNostrInvoice.type).toEqual(NostrType);
		expect(paidNostrInvoice.pubkey).toEqual('3f751c3eeb89898a7bc4946575279e687f27f043bfdcf7fc082f1c21381a49ca');
		expect(paidNostrInvoice.amount).toEqual(21);
	});
	it('should parse nostr type invoices without available username', function() {
		const paidNostrInvoice = PaidInvoice(nostrInvoiceNoUsername, usernameCache);
		expect(paidNostrInvoice).toBeDefined();
		expect(paidNostrInvoice.type).toEqual(NostrType);
		expect(paidNostrInvoice.pubkey).toEqual('somepubkey');
		expect(paidNostrInvoice.username).toBeUndefined();
		expect(paidNostrInvoice.amount).toEqual(21);
	});
	it('should parse lightnint address type invoices', function() {
		const paidLAInvoice = PaidInvoice(lightningAddressInvoice);
		expect(paidLAInvoice).toBeDefined();
		expect(paidLAInvoice.type).toEqual(TipType);
		expect(paidLAInvoice.amount).toEqual(1000);
	});
	it('should parse keysend invoices', function() {
		const keysendPaidInvoice = PaidInvoice(keysendInvoice);
		expect(keysendPaidInvoice).toBeDefined();
		expect(keysendPaidInvoice.type).toEqual(KeysendType);
		expect(keysendPaidInvoice.amount).toEqual(10);
	});
	it('should parse normal invoices', function() {
		const normalPaidInvoice = PaidInvoice(normalInvoice);
		expect(normalPaidInvoice).toBeDefined();
		expect(normalPaidInvoice.type).toEqual(DefaultType);
		expect(normalPaidInvoice.amount).toEqual(1);
	});
});