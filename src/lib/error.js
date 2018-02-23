/**
 * Error Handler
 *
 * @param {object} err The uncatched Error
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {Function} next The next callback function
 * @returns {void}
 */
const error = (err, req, res, next) => {
	let response = {
		error: 'Server Error',
		message: 'An Unexpected Error Occurred'
	}
	let status = 500

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

export default error
