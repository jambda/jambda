'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _express = require('express')

var _express2 = _interopRequireDefault(_express)

var _bodyParser = require('body-parser')

var _bodyParser2 = _interopRequireDefault(_bodyParser)

var _cors = require('cors')

var _cors2 = _interopRequireDefault(_cors)

var _compression = require('compression')

var _compression2 = _interopRequireDefault(_compression)

var _winston = require('winston')

var _winston2 = _interopRequireDefault(_winston)

var _expressWinston = require('express-winston')

var _expressWinston2 = _interopRequireDefault(_expressWinston)

var _database = require('./config/database')

var _database2 = _interopRequireDefault(_database)

var _router = require('./router')

var _router2 = _interopRequireDefault(_router)

var _error = require('./lib/error')

var _error2 = _interopRequireDefault(_error)

var _serverlessHttp = require('serverless-http')

var _serverlessHttp2 = _interopRequireDefault(_serverlessHttp)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Creates a new Express application given a prefix and a model
 *
 * @param {string} connector The connector name (eg: redis, rethinkdb, arangodb, mysql, etc...)
 * @param {Schema[]} models The array of models to be added as api's
 * @returns {express} The Express app
 */
var Jambda = function Jambda(connector, models) {
	var app = (0, _express2.default)()

	app.use((0, _compression2.default)())
	app.use((0, _cors2.default)())
	app.use(_bodyParser2.default.json())
	app.use(_bodyParser2.default.urlencoded({ extended: true }))

	if (process.env.NODE_ENV !== 'test') {
		app.use(
			_expressWinston2.default.logger({
				transports: [
					new _winston2.default.transports.Console({
						json: true,
						colorize: true
					})
				],
				meta: true, // optional: control whether you want to log the meta data about the request (default to true)
				msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
				expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
				colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
				ignoreRoute: function ignoreRoute(req, res) {
					return false
				} // optional: allows to skip some log messages based on request and/or response
			})
		)
	}

	var db = (0, _database2.default)(connector)

	models.forEach(function(model) {
		var m = new model(db)
		app.use('/' + m.modelName, (0, _router2.default)(m))
	})

	app.use(_error2.default)

	return process.env.NODE_ENV === 'test'
		? app
		: (0, _serverlessHttp2.default)(app)
}

exports.default = Jambda
