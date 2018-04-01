import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties'
import _Object$keys from 'babel-runtime/core-js/object/keys'
import winston from 'winston'
import expressWinston from 'express-winston'

/**
 * Jambda onLoad lifecycle event
 *
 * @param {Object} app The express app
 * @param {Object} config The app config object
 * @returns {void}
 */
export const onLoad = function(app, config) {
    const { server } = config
    const { logging } = server
    if (server.hasOwnProperty('logging')) {
        app.use(
            expressWinston.logger({
                transports: getTransports(logging.transports || []),
                meta: logging.meta || true, // logs metadata
                msg:
                    logging.format ||
                    'HTTP:{{req.method}}:{{res.statusCode}} {{req.url}} {{res.responseTime}}ms', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
                expressFormat: !logging.format, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
                colorize:
                    logging.colorize !== undefined ? logging.colorize : false // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            })
        )
    }
}

/**
 * Prepares each transport in the config object or add's
 * a default console logger in case none is specified
 *
 * @param {Object} transportsConfig The transports config object
 * @returns {Object[]} The instances of winstom transports
 */
const getTransports = transportsConfig => {
    const transports = _Object$keys(transportsConfig)
    if (transports.length) {
        return transports.map(name => {
            const _transportsConfig$nam = transportsConfig[name],
                { type } = _transportsConfig$nam,
                props = _objectWithoutProperties(_transportsConfig$nam, [
                    'type'
                ])
            if (winston.transports.hasOwnProperty(type))
                return new winston.transports[type](props)
        })
    }
    return [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}
