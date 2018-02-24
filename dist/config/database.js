'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _caminte = require('caminte')

var _caminte2 = _interopRequireDefault(_caminte)

var _promisify = require('./../helper/promisify')

var _promisify2 = _interopRequireDefault(_promisify)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

var Schema = _caminte2.default.Schema

/**
 * The database connector
 *
 * @param {string} connector The connector name
 * @returns {schema.Schema} The connection
 */
var connect = function connect(connector) {
	var params = void 0
	var config = require('./connectors/' + connector + '.js')

	switch (process.env.NODE_ENV) {
		case 'production':
			params = config.production()
			break
		case 'test':
			params = config.test()
			break
		default:
			params = config.development()
			break
	}

	var schema = new Schema(params.driver, params)

	schema.autoupdate(function() {})

	return schema
}

exports.default = connect
