import _Object$keys from 'babel-runtime/core-js/object/keys'
import helmet from 'helmet'
import { is } from './../helper/util'

/**
 * Jambda onLoad lifecycle event
 * Adds helmet security options to the application
 *
 * @param {Object} app The express app
 * @param {Object} config The app config object
 * @returns {void}
 */
export const onLoad = function(app, config) {
    const { server } = config
    if (server.hasOwnProperty('helmet')) {
        if (server.helmet === true) {
            app.use(helmet())
        }
        if (is('object', server.helmet, true)) {
            const helmets = filterValidHelmets(server.helmet)
            if (_Object$keys(helmets).length) {
                app.use(helmet(helmets))
            }
        }
    }
}

/**
 * Filters the provided helmets to only valid helmets
 *
 * @param {Object} configHelmets The configuration object
 * @returns {Object} The filtered helmets object
 */
const filterValidHelmets = configHelmets => {
    const filteredHelmets = {}
    const validHelmets = [
        'contentSecurityPolicy',
        'expectCt',
        'dnsPrefetchControl',
        'frameguard',
        'hidePoweredBy',
        'hpkp',
        'hsts',
        'ieNoOpen',
        'noCache',
        'noSniff',
        'referrerPolicy',
        'xssFilter'
    ]

    _Object$keys(configHelmets).forEach(property => {
        if (validHelmets.indexOf(property) > -1) {
            filteredHelmets[property] = configHelmets[property]
        } else {
            console.warn(
                `Helmet configuration ${property} is invalid and was ignored.`
            )
        }
    })

    return filteredHelmets
}
