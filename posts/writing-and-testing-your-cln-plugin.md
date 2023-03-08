---
layout: post
title: "Writing and Testing your First CLN Plugin"
date: '2023-03-07'
categories: cln nostr lightning plugins
---

# Why write about this? isn't there already information in the documentation?

Short answer, yes there is. There are a bunch of links in the references below to all of it that I could find. But, after creating my first plugin [Nostrify], I knew thre must be a better way. Especially if you are doing something more that just sending events to Nostr.

My development environment was just my live node, and me live updating the code, stopping CLN and starting it again, watching the errors in the output.

It's still very cool that I was able to do it that way, mostly by copying [helloworld.py] and looking at other plugins. But, once I got it working I didn't really want to touch it again for fear of breaking it and having to go through my development *process* again.

So, I started asking around to try and find out how people normally did this. Especially people that have built plugins that are much more complex than what I did.

So that's what I wanted to figure out, and why I decided to write it down. Not how to get a plugin working but how to write one you can test, update (with new versions), and improve over time without just doing it live.

# First step, what do other people do?

I started asking around to find out what some best practices were. I got the best asnwer from this [Post on BOL2 from @rusty and @cdecker]. If you haven't seen this site it's a new but good resource and they seem invested in helping people learn. Other good places I found were the [Core Lightning Discord], which I think gets more use (and more responses) than the Telegram chat.

My post was titled **What's your dev setup for writing plugins?** and both **@decker** and **@rusty** chimed in with some good answers. 

First **@rusty** said this:

> I use startup_regtest and plugin start/stop commands. Of course, I save time when my plugin dies by itself, so I don't need to restart!

I have heard about this in the past pretty often actually but I wanted something that didn't require as much setup. Updating plugins on each of the nodes seems like a lot of work and a lot of state to get right in order to get set up well. But, I think this is what most plugin developers do so it probably works well when you get used to it.

You can find the [startup_regtest.sh] script in the `/contrib` directory of the [Core Lightning Repo], the script itself has instructions in the comments on how to use it.

The next suggestion from **@cdecker** was this:

<blockquote>
I prefer to write my plugins with the help of pyln-testing (disclaimer: I wrote the first version of it, so I'm definitely not neutral in this discussion ^^). It is the same testing framework used to test CLN itself, and has facilities to spin up an entire network, with a given topology and drive nodes through a variety of scenarios. It does all that in a reproducible manner, and can run tests unattended.

I know development is a bit different from testing, but you can get an interactive shell by placing a `breakpoint()` after the setup. This allows you to drive the other nodes from the python environment, inspect variables, and even have canned actions in the form of functions that you can call from that shell. Once you have the scenario configure you can either take control of one of the nodes described in the test, or attach a new one from another shell (I'd suggest the former option, as it quite naturally leads to completing the test to be a real test that can be run going forward, and breaking if there is any regression).

Getting started with pyln-testing can be a bit of an uphill battle, but once you've seen how it works you likely won't go back to bash scripts 🙂
</blockquote>

This suggestion from **@cdecker** recommended using [pyln-testing] which is what they use to test Core Lightning itself. 

This sounded really appealing to me. Even though it's probably more difficult to wrap your head around I like the idea of being able to write tests for my plugin that I can run continually.

I have used the [startup_regtest.sh] setup before and it is really cool, probably necessary for some things. You can really quickly setup a set of three nodes connected to each other. It creates aliases for you to access each one. 

But, I kind of like writing test so I decided to try the [pyln-testing] route.

# How do I start running tests with `[pyln-testing]`?

Just to make sure I could run the tests, I decided to try running the Core Lightning test suite first. There are instructions there on how to do it which I won't go over. But, I ran into an issue where I was getting `econnrefused` and all the tests failed. 

It turns out I hadn't install Bitcoin Core on my VM and [pyln-testing] uses a `regtest` nextwork to back up their testing nodes. Just FYI in case you run into something similar. It is probably a good thing to try just to make sure you have all the dependencies etc.

# Writing your first Plugin test

I'm going to use my plugin [Nostrify] for the rest of this as an example. It's pretty simple so I think it's a good demo, there is also [helloworld.py] if you want an even more simple one to start from.

So I have a plugin that I know *mostly* works, in a repo and now I want to add test to it, where do I start?

I started by looking in the [Plugins Repo] which is just a directory full of Core Lightning plugins you can use. There is a little documentation there on how to write tests. But, mostly it's a really good place to find examples of what other plugins do.

From the [Section on Testing from Plugins Repo] it gives an example test like this:

```python
from pyln.testing.fixtures import *

pluginopt = {'plugin': os.path.join(os.path.dirname(__file__), "YOUR_PLUGIN.py")}

def test_your_plugin(node_factory, bitcoind):
    l1 = node_factory.get_node(options=pluginopt)
    s = l1.rpc.getinfo()
    assert(s['network'] == 'regtest') # or whatever you want to test
```

And the commands to run it:

```shell
pytest YOUR_PLUGIN/YOUR_TEST.py
```

There is a blurb before about how tests are setup with plugins:

<blockquote>
The pyln-testing library provides a number of helpers and fixtures to write tests. While not strictly necessary, writing a test will ensure that your plugin is working correctly against a number of configurations (both with and without DEVELOPER, COMPAT and EXPERIMENTAL_FEATURES), and more importantly that they will continue to work with newly release versions of Core-Lightning.

Writing a test is as simple as this:

The framework will look for unittest filenames starting with test_.
The test functions should also start with test_.
</blockquote>

As it mentions there, you need to use the `[pyln-testing]` library for your tests. There is a convention to have a `requirements.txt` in the folder of your plugin for any dependencies, so I added this there. My `requirements.txt` looks like this:

```
pyln-client>=0.12
pyln-testing
```

It also has `pyln-client` because that's what I use to access the `lightning-cli` rpc inside of it. If you haven't installed your dependencies yet, you can run `pip3 install -r requirements.txt` and that will install them.

I added a test file in my directory called `test_nostrify.py` just like the example and ran it with `pytest test_nostrify.py`.

Here is the output:

```
(main)$ pytest test_nostrify.py 
==== test session starts ====
platform linux -- Python 3.10.6, pytest-7.2.2, pluggy-1.0.0
rootdir: /home/azureuser/nostrify
collected 1 item 

test_nostrify.py .  [100%]

=== 1 passed in 36.88s ===
```

My test passed! I only have one fake test but it's a pretty big step that I can run them. Now that they are working, what should we actually test?

# Actually testing something useful

My plugin just subscribed to events, like `channel_opened` for example and makes a formatted string with a bunch of the data you can get about that, then sends a Nost event with it.

I use [nostril] and [websocat] for creating the Nostr event, and sending it to a relay. So, I don't think I need to test that part. But, I would like to test that the strings I'm sending look right.

I found a plugin in the [Plugins repo] called `feeadjuster` that had a test like this:

```python
def test_feeadjuster_starts(node_factory):
    l1 = node_factory.get_node()
    # Test dynamically
    l1.rpc.plugin_start(plugin_path)
    l1.daemon.wait_for_log("Plugin feeadjuster initialized.*")
		...
```

The method there `wait_for_log` sounds like something I could use if I log my messages, at least in testing mode. If I caused an event like `channel_open` then asserted that the logs showed that event I think that would be useful. I just need to set up two test nodes, and open a channel between them, that should trigger the `channel_opened` event and I can check the logs for my message.

First though, the test from `feeadjuster` simply tested that the plugin started. Which seems like a good one to have as well. So I will try and mimic that first.

# Testing that your plugin starts

Plugins can be `dynamic` or not. Meaning you can start them while `lightningd` is running, if they're dynamic. If not, you have to stop and start `lightningd` for it to pick it up. This test tries loading the plugin both ways. So, I did that same pattern.

In my `init` function I log a message like this: `Plugin nostrify initialized` so I'm going to use that `wait_for_log` function to look for that message.

There are two ways to wait for a log apparently `wait_for_log` which waits for a new instance of that log, and `wait_for_logs` which looks through the whole log. So depending on what you want you might need to check for multiple of the same log at the end. This is how it works in my test (this is the full test):

```python
def test_nostrify_starts(node_factory):
    l1 = node_factory.get_node()
    # Test dynamically
    l1.rpc.plugin_start(plugin_path)
    l1.daemon.wait_for_log("Plugin nostrify initialized")
    l1.rpc.plugin_stop(plugin_path)
    l1.rpc.plugin_start(plugin_path)
    l1.daemon.wait_for_log("Plugin nostrify initialized")
    l1.stop()
    # Then statically
    l1.daemon.opts["plugin"] = plugin_path
    l1.start()
    # Start at 0 and 're-await' the two inits above. Otherwise this is flaky.
    l1.daemon.logsearch_start = 0
    l1.daemon.wait_for_logs(["Plugin nostrify initialized",
                             "Plugin nostrify initialized",
                             "Plugin nostrify initialized"])
    l1.rpc.plugin_stop(plugin_path)
```

You'll notice the `node_factory` is passed into the test, which seems like what you use to create and manipulate nodes.

I ran this test, and it worked! This is actually really useful to know I didn't break the plugin completely when modifying it. Now, let's try testing that we get a `channel_update` message when we connect two nodes.

# Setting up a channel between test nodes



# References
- [Plugins Repo]
- [Post on BOL2 from @rusty and @cdecker]
- [Plugin Development Documentation]
- [Section on Testing from Plugins Repo]
- [helloworld.py]
- [Nostrify]
- [community.corelightning.org]
- [Core Lightning Discord]
- [startup_regtest.sh]
- [Core Lightning Repo]
- [pyln-testing]
- [nostril]
- [websocat]

[Plugins Repo]: https://github.com/lightningd/plugins/tree/master
[Post on BOL2 from @rusty and @cdecker]: https://community.corelightning.org/c/developers/what-s-you-dev-setup-for-writing-plugins#comment_wrapper_16430306
[Plugin Development Documentation]: https://docs.corelightning.org/docs/plugin-development
[Section on Testing from Plugins Repo]: https://github.com/lightningd/plugins#writing-tests
[helloworld.py]: https://github.com/ElementsProject/lightning/blob/master/contrib/plugins/helloworld.py
[Nostrify]: https://github.com/joelklabo/nostrify
[community.corelightning.org]: https://community.corelightning.org
[Core Lightning Discord]: https://discord.com/invite/mE9s4rc5un
[startup_regtest.sh]: https://github.com/ElementsProject/lightning/blob/master/contrib/startup_regtest.sh
[Core Lightning Repo]: https://github.com/ElementsProject/lightning
[Write a clever plugin manager written in rust for core lightning]: https://www.youtube.com/watch?v=g5N10bJ_9xU
[pyln-testing]: https://pypi.org/project/pyln-testing/
[nostril]: https://github.com/jb55/nostril/tree/master
[websocat]: https://github.com/vi/websocat