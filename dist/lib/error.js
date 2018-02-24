'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
/**
 * Error Handler
 *
 * @param {object} err The uncatched Error
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next callback function
 * @returns {void}
 */
var error = function error(err, req, res, next) {
	var response = {
		error: 'Server Error',
		message: 'An Unexpected Error Occurred'
	}
	var status = 500

	if (err.isBoom) {
		status = err.output.statusCode
		response.error = err.output.payload.error
		response.message = err.message

		if (err.data) {
			response.data = err.data
		}
	}

	res.status(status).json(response)
}

exports.default = error
