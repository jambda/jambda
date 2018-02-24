'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
var production = (exports.production = function production() {
	return {
		driver: 'rethinkdb',
		host: '127.0.0.1',
		port: '32773',
		// username   : 'test',
		// password   : 'test',
		database: 'nano_test',
		autoReconnect: true
	}
})

var development = (exports.development = function development() {
	return {
		driver: 'rethinkdb',
		host: '127.0.0.1',
		port: '32773',
		// username   : 'test',
		// password   : 'test',
		database: 'nano_test',
		autoReconnect: true
	}
})

var test = (exports.test = function test() {
	return {
		driver: 'rethinkdb',
		host: '127.0.0.1',
		port: '32773',
		// username   : 'test',
		// password   : 'test',
		database: 'nano_test',
		autoReconnect: true
	}
})
