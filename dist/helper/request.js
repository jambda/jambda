'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
/**
 * Checks if the request has an id
 *
 * @param {object} req The request object
 * @returns {boolean} True if it as an ID false otherwise
 * @private
 */
var __requestHasId = (exports.__requestHasId = function __requestHasId(req) {
	return req.params && req.params.id
})

/**
 * Get's the event id parameter
 *
 * @param {object} req The request object
 * @returns {any|null} The id if it exists null otherwise
 * @private
 */
var __getRequestId = (exports.__getRequestId = function __getRequestId(req) {
	return __requestHasId(req) ? req.params.id : null
})
