import cors from 'cors'
import { is } from './../helper/util'

/**
 * Jambda onLoad lifecycle event
 * Adds cross site domain control options to the application
 *
 * @param {Object} app The express app
 * @param {Object} config The app config object
 * @returns {void}
 */
export const onLoad = function(app, config) {
    const { server } = config
    if (server.hasOwnProperty('cors')) {
        if (server.cors === true) {
            app.use(cors())
        }

        if (is('object', server.cors, true)) {
            if (server.cors.hasOwnProperty('from')) {
                const { from } = server.cors
                app.use(
                    Array.isArray(from)
                        ? getDynamicCors(from)
                        : getOriginCors(from)
                )
            }
        }
    }
}

/**
 * Gets a cors configuration object for a single origin
 *
 * @param {String} from The config server.cors.from parameter
 * @returns {{origin: *}} The config object
 */
const getOriginCors = from => ({
    origin: from
})

/**
 * A dynamic cross site domain verification function
 * that will allow traffic from any domain in the whitelist
 *
 * @param {String[]} whitelist The domains array
 * @returns {{origin: origin}} The config object
 */
const getDynamicCors = whitelist => {
    return {
        origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
}
