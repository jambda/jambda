import yaml from 'yamljs'
import map from 'aigle/map'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import winston from 'winston/lib/winston'
import expressWinston from 'express-winston'
import error from './../lib/error'

/**
 * Constructor
 *
 * @param {Object} event The event name
 * @param {Object} app The express application
 * @param {Object} config The config object
 * @returns {function(String:module)} callModuleMethod
 */
const callModuleMethod = (event, app, config) => module => {
    if (module.hasOwnProperty(event)) {
        module[event](app, config)
    }
}

/**
 * Load all modules
 *
 * @param {Object} config The config object
 * @returns {Promise<Array>} The loaded modules
 */
const loadModules = async config => {
    if (config.hasOwnProperty('modules')) {
        return map(config.modules, async name => import(name))
    }
    return Promise.resolve([])
}

/**
 * Register the default modules
 *
 * @param {Object} app The express application
 * @param {Object} config The config object
 * @returns {void}
 */
const registerDefaults = (app, config) => {
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
                ignoreRoute: function(req, res) {
                    return false
                } // optional: allows to skip some log messages based on request and/or response
            })
        )
    }
}

/**
 * Creates a register function to help adding modules to the application
 *
 * @param {Object} app The express application
 * @param {Object} config The config object
 * @param {Object[]} modules The modules array
 * @returns {function(String:event)} The register function
 */
const register = (app, config, modules) => event =>
    map(modules, callModuleMethod(event, app, config))

/**
 * The application load function
 *
 * @param {Object} app The express application
 * @param {Object} config The config object
 * @returns {Promise<Object>} The application object
 */
const load = async (app, config) => {
    try {
        const modules = await loadModules(config)
        const constructor = register(app, config, modules)

        constructor('onLoad')
        registerDefaults(app, config)
        constructor('onBeforeRoute')
        constructor('registerRoutes')
        constructor('onAfterRoute')
        constructor('onError')
        app.use(error)

        return app
    } catch (error) {
        throw new Error()
    }
}

export default load
