'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
var production = (exports.production = function production() {
	return {
		driver: 'redis',
		host: '127.0.0.1',
		port: '6379',
		// username   : 'test',
		// password   : 'test',
		//database   : './db/test.db',
		autoReconnect: true
	}
})

var development = (exports.development = function development() {
	return {
		driver: 'redis',
		host: '127.0.0.1',
		port: '6379'
		// username   : 'test',
		// password   : 'test',
		//database   : './db/test.db',
		//autoReconnect : true
	}
})

var test = (exports.test = function test() {
	return {
		driver: 'redis',
		host: '127.0.0.1',
		port: '6379'
		// username   : 'test',
		// password   : 'test',
		//database   : './db/test.db',
		//autoReconnect : true
	}
})
