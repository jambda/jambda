/**
 * Checks if the request has an id
 *
 * @param {object} req The request object
 * @returns {boolean} True if it as an ID false otherwise
 * @private
 */
export const __requestHasId = req => {
	return req.params && req.params.id
}

/**
 * Get's the event id parameter
 *
 * @param {object} req The request object
 * @returns {any|null} The id if it exists null otherwise
 * @private
 */
export const __getRequestId = req => {
	return __requestHasId(req) ? req.params.id : null
}
