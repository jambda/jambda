import express from 'express'
import yaml from 'yamljs'
import extend from 'lodash/extend'
import serverless from 'serverless-http'
import moduleLoader from './lib/modules'

/**
 * The Jambda function
 *
 * @param {String} configFilePath The path to the config file
 * @returns {Promise<*>} The Jambda class
 */
const Jambda = async function(configFilePath) {
    const defaultConfig = yaml.load('./config/config.yml')
    const config = yaml.load(configFilePath)

    extend(defaultConfig, config)

    const app = express()

    await moduleLoader(app, config)

    return serverless(app)
}

export default Jambda
