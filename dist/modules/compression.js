import compression from 'compression'

/**
 * Jambda onLoad lifecycle event
 * Adds request compression options to the application
 *
 * @param {Object} app The express app
 * @param {Object} config The app config object
 * @returns {void}
 */
export const onLoad = function(app, config) {
    app.use(compression())
}
