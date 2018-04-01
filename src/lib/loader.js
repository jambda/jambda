import path from 'path'
import aigle from 'aigle'
import { is } from './../helper/util'
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
    if (is('function', module[event])) {
        module[event](app, config)
    }

    return module
}

/**
 * Load all modules
 *
 * @param {Object} config The config object
 * @returns {Promise<Array>} The loaded modules
 */
const loadModules = async config => {
    if (config.hasOwnProperty('modules')) {
        return aigle.map(config.modules, async name => {
            return await require(path.join(__dirname, '../', name))
        })
    }
    return Promise.resolve([])
}

/**
 * Creates a register function to help adding modules to the application
 *
 * @param {Object} app The express application
 * @param {Object} config The config object
 * @param {Object[]} modules The modules array
 * @returns {function(String:event)} The register function
 */
const register = (app, config, modules) => async event =>
    aigle.map(modules, callModuleMethod(event, app, config))

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

        await constructor('onLoad')
        await constructor('onBeforeRoute')
        await constructor('registerRoutes')
        await constructor('onAfterRoute')
        await constructor('onError')
        app.use(error)

        return app
    } catch (error) {
        throw new Error(error.message)
    }
}

export default load
