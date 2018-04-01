import _regeneratorRuntime from 'babel-runtime/regenerator'
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator'
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
const Jambda = (() => {
    var _ref = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(
            configFilePath
        ) {
            var config, app
            return _regeneratorRuntime.wrap(
                function _callee$(_context) {
                    while (1)
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                config = loadYaml(
                                    __dirname,
                                    'config/config.yml'
                                )

                                extend(config, loadYaml(configFilePath))

                                app = express()
                                _context.next = 5
                                return loader(app, config)

                            case 5:
                                if (
                                    !(
                                        config.platform === SERVERLESS &&
                                        process.env.NODE_ENV !== TEST
                                    )
                                ) {
                                    _context.next = 7
                                    break
                                }

                                return _context.abrupt(
                                    'return',
                                    serverless(app)
                                )

                            case 7:
                                return _context.abrupt('return', app)

                            case 8:
                            case 'end':
                                return _context.stop()
                        }
                },
                _callee,
                this
            )
        })
    )

    return function Jambda(_x) {
        return _ref.apply(this, arguments)
    }
})()

export default Jambda
