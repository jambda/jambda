'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
exports.failure = exports.success = undefined

var _boom = require('boom')

var _boom2 = _interopRequireDefault(_boom)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Builds a success response message
 *
 * @param {number} code The http response code
 * @param {object} response The response to be sent to the user
 * @param {object} context The request context
 * @returns {object} {{headers: {Content-Type}, statusCode: *, body}}
 */
var success = function success(code, response, context) {
	__headers(context)
	return context.json(code, response)
}

/**
 * Builds a error message
 *
 * @param {object} boom A Boom object
 * @param {object} context The request context
 * @returns {object} {{headers: {Content-Type}, statusCode, body}}
 */
var failure = function failure(boom, context) {
	__headers(context)

	if (!boom.isBoom) {
		boom = new _boom2.default(boom)
	}

	return context.json({
		message: boom.output.payload.message
	})
}

/**
 * Private method to get the response headers
 *
 * @param {object} context The context object
 * @returns {object} The context
 * @private
 */
var __headers = function __headers(context) {
	context.set('Content-Type', 'application/json')
	return context
}

exports.success = success
exports.failure = failure
