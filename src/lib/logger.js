import winston from 'winston'

/**
 * Creates a new instance of the file logger
 *
 * @param {Object[]} transports A list of transports to be used for the new logger
 * @returns {winston.Logger} the logger instance
 */
export const createLogger = (transports = null) =>
	new winston.Logger({
		transports: transports || [
			new winston.transports.File({
				filename: `./logs/${process.env.NODE_ENV.toLowerCase()}_error.log`,
				level: 'error'
			}),
			new winston.transports.Console({
				json: false,
				colorize: false
			})
		],
		meta: true,
		msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}',
		expressFormat: true,
		colorize: true
	})

export const logger = createLogger()
