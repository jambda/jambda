import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import winston from 'winston'
import expressWinston from 'express-winston'
import connect from './config/database'
import router from './router'
import error from './lib/error'
import serverless from 'serverless-http'

/**
 * Creates a new Express application given a prefix and a model
 *
 * @param {string} connector The connector name (eg: redis, rethinkdb, arangodb, mysql, etc...)
 * @param {Schema[]} models The array of models to be added as api's
 * @returns {express} The Express app
 */
const Jambda = (connector, models) => {
	const app = express()

	app.use(compression())
	app.use(cors())
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	if (process.env.NODE_ENV !== 'test') {
		app.use(
			expressWinston.logger({
				transports: [
					new winston.transports.Console({
						json: true,
						colorize: true
					})
				],
				meta: true, // optional: control whether you want to log the meta data about the request (default to true)
				msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
				expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
				colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
				ignoreRoute: (req, res) => {
					return false
				} // optional: allows to skip some log messages based on request and/or response
			})
		)
	}

	const db = connect(connector)

	models.forEach(model => {
		const m = new model(db)
		app.use(`/${m.modelName}`, router(m))
	})

	app.use(error)

	return process.env.NODE_ENV === 'test' ? app : serverless(app)
}

export default Jambda
