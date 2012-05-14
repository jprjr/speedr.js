Speedr
====
Improved javascript objects.

Motivation
----
Javascript is built on objects.  You can use them to make functions or nifty class-like constructs, but mostly we know them from when we {use: 'them', like: {hash: 'maps'}}.

Javascript objects are a good fit for many purposes, but there are big gaps in their implementation:

* What if I need sorting?
* Do I really need to loop through and count manually in order to get the number of elements I've defined in an object?
* What If I need *fast* iteration on Node.js or Chrome?  For small objects, this isn't an issue, but as an object grows in size, iteration speeds can become troublesome.

Speedr addresses these issues and then some.  

Features
----
* Blazing fast iteration on V8 platforms like Chrome and Node.js.  Huge speedups over the normal for..in object iteration are common.
* No-overhead .length attribute.  Just like with Array.length, Speedr maps keep track of their lengths internally.  Iteration should only be necessary when you're actually doing something useful with the data.
* Fast sorting using binary search.
* Duplicate or unique keys for sorted maps.
* No external dependencies.

Getting Started
----


Tests and Benchmarks
----
* Go try out the [jsPerf benchmarks!](http://jsperf.com/speedr-js-vs-normal-object-iteration/2)
* To run the tests on Node.js:
	* Make sure you have [NPM installed](http://nodejs.org/#download) (it comes with Node.js).  
	* Get Coffeescript: `sudo npm -g coffee-script`.
	* cd into your tests directory: `cd speedr/tests`.
	* Install test dependencies: `npm install`
	* Run `coffee tests-node.coffee` or `coffee bench-node.coffee`.