import express from 'express'
import extend from 'lodash/extend'
import serverless from 'serverless-http'
import loader from './lib/loader'
import { loadYaml } from './helper/util'
import { TEST, SERVERLESS } from './config/constants'

/**
 * The Jambda function
 *
 * @param {String} configFilePath The path to the config file
 * @returns {Promise<*>} The Jambda class
 */
const Jambda = async function(configFilePath) {
    const config = loadYaml(__dirname, 'config/config.yml')

    extend(config, loadYaml(configFilePath))

    const app = express()

    await loader(app, config)

    if (config.platform === SERVERLESS && process.env.NODE_ENV !== TEST) {
        return serverless(app)
    }

    return app
}

export default Jambda
