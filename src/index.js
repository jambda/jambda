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
import { logger } from './lib/logger'
import * as config from './config/config'

/**
 * Creates a new Express application given a prefix and a model
 *
 * @param {string} connector The connector name (eg: redis, rethinkdb, arangodb, mysql, etc...)
 * @param {Schema[]} models The array of models to be added as api's
 * @returns {express} The Express app
 */
const Jambda = (connector, models) => {
	logger.info('Preparing your app...')
	logger.info(`Environment is ${process.env.NODE_ENV}`)

	config.load(connector)

	const app = express()
	if (
		!config.has('compression') ||
		(config.has('compression') && config.get('compression') !== false)
	) {
		app.use(compression())
	}

	if (config.has('cors')) {
		app.use(cors(config.get('cors', {})))
	}

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
				meta: true,
				msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}',
				expressFormat: true,
				colorize: true
			})
		)
	}

	const db = connect()

	models.forEach(model => {
		const m = new model(db)
		app.use(`/${m.modelName}`, router(m))
	})

	app.use(error)
	logger.info('ROUTES')
	logger.info(app._routes)

	logger.info('App initialized!')
	return process.env.NODE_ENV === 'test' ? app : serverless(app)
}

export default Jambda
