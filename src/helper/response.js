import Boom from 'boom'

/**
 * Builds a success response message
 *
 * @param {number} code The http response code
 * @param {object} response The response to be sent to the user
 * @param {object} context The request context
 * @returns {object} {{headers: {Content-Type}, statusCode: *, body}}
 */
const success = (code, response, context) => {
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
const failure = (boom, context) => {
	__headers(context)

	if (!boom.isBoom) {
		boom = new Boom(boom)
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
const __headers = context => {
	context.set('Content-Type', 'application/json')
	return context
}

export { success, failure }
