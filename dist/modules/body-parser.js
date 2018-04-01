import bodyParser from 'body-parser'
import { is } from './../helper/util'

/**
 * Jambda onLoad lifecycle event
 * Adds body-parser options to the application
 *
 * @param {Object} app The express app
 * @param {Object} config The app config object
 * @returns {void}
 */
export const onLoad = function(app, config) {
    const { server } = config
    if (server.hasOwnProperty('parsers')) {
        if (is('boolean', server.parsers, true)) {
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({ extended: true }))
        }
        if (is('object', server.parsers)) {
            if (server.parsers.json === true) {
                app.use(bodyParser.json())
            }
            if (server.parsers.urlEncoded === true) {
                app.use(bodyParser.urlencoded({ extended: true }))
            }
        }
    }
}
