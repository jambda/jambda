'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _boom = require('boom')

/**
 * Helper function to set the error response for invalid models
 *
 * @param {Schema} model The model
 * @param {Function} reject The reject callback
 * @param {Function} callback The success callback
 * @returns {void}
 */
var validate = function validate(model, reject, callback) {
	model.isValid(function(isValid) {
		if (!isValid) {
			return reject(
				(0, _boom.badData)(
					'Invalid data provided, please verify and try again!',
					model.errors
				)
			)
		}

		callback(model)
	})
}

exports.default = validate
