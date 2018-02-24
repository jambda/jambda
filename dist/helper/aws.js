'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _awsSdk = require('aws-sdk')

var _awsSdk2 = _interopRequireDefault(_awsSdk)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Get an instance of a client from the AWS SDk
 *
 * @param {object} client The client name to be instantiated (eg: S3, SQS, Lambda)
 * @returns {AWS} The AWS client instance
 */
var aws = function aws(client) {
	if (_awsSdk2.default.hasOwnProperty(client)) {
		return new _awsSdk2.default[client]({ region: 'ca-central-1' })
	}

	throw new Error('Could not fine client by name "' + client + '"')
}

exports.default = aws
