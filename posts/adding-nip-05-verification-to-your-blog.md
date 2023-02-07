---
layout: post
title: "Adding Nostr NIP-05 Verification to Your Blog (Jekyll)"
date: '2023-01-04'
categories: nostr damus 
LNURL: LNURL1DP68GURN8GHJ7MRWVF5HGUEWDDKXZCN09E3XCMM89AKXUATJD3CZ7322G9F45MGQ7FKCZ
---

![image](/images/nostrich.jpg)

I've been playing around with Nostr recently. I've used Damus (iOS app) almost exclusively to try it out. It's been really fun and recently that client added the ability to verify yourself by hosting your Nostr public key on a domain you own. See the actual NIP-05 document [here](https://github.com/nostr-protocol/nips/blob/master/05.md).

There are a few guides out there on how to do it but I run my blog with Jekyll and none of them applied to me exactly so I thought I would go through the process here.

**Adding nostr.json to your site**

NIP-05 works by checking your username against a domain. Specifically looking for a JSON file at `yoursite.com/.well-known/nostr.json`. You can see mine as an example here: [klabo.blog/.well-known/nostr.json](https://www.klabo.blog/.well-known/nostr.json).

In that file you create a JSON object with your name and your public key. I will look something like this (this is mine).

```javascript
{
  "names": {
    "klabo": "2f4fa408d85b962d1fe717daae148a4c98424ab2e10c7dd11927e101ed3257b2"
  }
}
```

In order to host this file on your site you will need to edit your `_config.yml` file in your Jekyll blog. And add this line:

```ruby
include: [".well-known"]
```

Then you have to create the directory `.well-known` in the root of your project and put your `nostr.json` file in it.

Then run `bundle exec jekyll build` and you should be able to see it.

**Conclusion**

That's about it. Hope this helps someone get it going, pretty amazing that it only takes a few minutes. You can find me on Nostr here: `npub19a86gzxctwtz68l8zld2u9y2fjvyyj4juyx8m5geylssrmfj27eqs22ckt`

