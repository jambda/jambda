import _Promise from 'babel-runtime/core-js/promise'
import _regeneratorRuntime from 'babel-runtime/regenerator'
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator'

var _this = this

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
const loadModules = (() => {
    var _ref = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2(config) {
            var _ref2

            return _regeneratorRuntime.wrap(
                function _callee2$(_context2) {
                    while (1)
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                if (!config.hasOwnProperty('modules')) {
                                    _context2.next = 2
                                    break
                                }

                                return _context2.abrupt(
                                    'return',
                                    aigle.map(
                                        config.modules,
                                        (() => {
                                            _ref2 = _asyncToGenerator(
                                                /*#__PURE__*/ _regeneratorRuntime.mark(
                                                    function _callee(name) {
                                                        return _regeneratorRuntime.wrap(
                                                            function _callee$(
                                                                _context
                                                            ) {
                                                                while (1)
                                                                    switch ((_context.prev =
                                                                        _context.next)) {
                                                                        case 0:
                                                                            _context.next = 2
                                                                            return require(path.join(
                                                                                __dirname,
                                                                                '../',
                                                                                name
                                                                            ))

                                                                        case 2:
                                                                            return _context.abrupt(
                                                                                'return',
                                                                                _context.sent
                                                                            )

                                                                        case 3:
                                                                        case 'end':
                                                                            return _context.stop()
                                                                    }
                                                            },
                                                            _callee,
                                                            _this
                                                        )
                                                    }
                                                )
                                            )
                                            return function(_x2) {
                                                return _ref2.apply(
                                                    this,
                                                    arguments
                                                )
                                            }
                                        })()
                                    )
                                )

                            case 2:
                                return _context2.abrupt(
                                    'return',
                                    _Promise.resolve([])
                                )

                            case 3:
                            case 'end':
                                return _context2.stop()
                        }
                },
                _callee2,
                _this
            )
        })
    )

    return function loadModules(_x) {
        return _ref.apply(this, arguments)
    }
})()

/**
 * Creates a register function to help adding modules to the application
 *
 * @param {Object} app The express application
 * @param {Object} config The config object
 * @param {Object[]} modules The modules array
 * @returns {function(String:event)} The register function
 */
const register = (app, config, modules) =>
    (() => {
        var _ref3 = _asyncToGenerator(
            /*#__PURE__*/ _regeneratorRuntime.mark(function _callee3(event) {
                return _regeneratorRuntime.wrap(
                    function _callee3$(_context3) {
                        while (1)
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    return _context3.abrupt(
                                        'return',
                                        aigle.map(
                                            modules,
                                            callModuleMethod(event, app, config)
                                        )
                                    )

                                case 1:
                                case 'end':
                                    return _context3.stop()
                            }
                    },
                    _callee3,
                    _this
                )
            })
        )

        return function(_x3) {
            return _ref3.apply(this, arguments)
        }
    })()

/**
 * The application load function
 *
 * @param {Object} app The express application
 * @param {Object} config The config object
 * @returns {Promise<Object>} The application object
 */
const load = (() => {
    var _ref4 = _asyncToGenerator(
        /*#__PURE__*/ _regeneratorRuntime.mark(function _callee4(app, config) {
            var modules, constructor
            return _regeneratorRuntime.wrap(
                function _callee4$(_context4) {
                    while (1)
                        switch ((_context4.prev = _context4.next)) {
                            case 0:
                                _context4.prev = 0
                                _context4.next = 3
                                return loadModules(config)

                            case 3:
                                modules = _context4.sent
                                constructor = register(app, config, modules)
                                _context4.next = 7
                                return constructor('onLoad')

                            case 7:
                                _context4.next = 9
                                return constructor('onBeforeRoute')

                            case 9:
                                _context4.next = 11
                                return constructor('registerRoutes')

                            case 11:
                                _context4.next = 13
                                return constructor('onAfterRoute')

                            case 13:
                                _context4.next = 15
                                return constructor('onError')

                            case 15:
                                app.use(error)

                                return _context4.abrupt('return', app)

                            case 19:
                                _context4.prev = 19
                                _context4.t0 = _context4['catch'](0)
                                throw new Error(_context4.t0.message)

                            case 22:
                            case 'end':
                                return _context4.stop()
                        }
                },
                _callee4,
                _this,
                [[0, 19]]
            )
        })
    )

    return function load(_x4, _x5) {
        return _ref4.apply(this, arguments)
    }
})()

export default load
