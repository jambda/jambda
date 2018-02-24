'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _express = require('express')

var _express2 = _interopRequireDefault(_express)

var _get = require('./get')

var _get2 = _interopRequireDefault(_get)

var _post = require('./post')

var _post2 = _interopRequireDefault(_post)

var _put = require('./put')

var _put2 = _interopRequireDefault(_put)

var _patch = require('./patch')

var _patch2 = _interopRequireDefault(_patch)

var _delete = require('./delete')

var _delete2 = _interopRequireDefault(_delete)

var _new = require('./new')

var _new2 = _interopRequireDefault(_new)

var _count = require('./count')

var _count2 = _interopRequireDefault(_count)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

var router = _express2.default.Router()

/**
 * Creates a new router with the provider prefix
 *
 * @param {Schema} model The model
 * @returns {express.Router} The express router object
 */
var create = function create(model) {
	router.route('/new').post((0, _new2.default)(model))

	router.route('/count').get((0, _count2.default)(model))

	router
		.route('/:id')
		.get((0, _get2.default)(model))
		.put((0, _put2.default)(model))
		.patch((0, _patch2.default)(model))
		.delete((0, _delete2.default)(model))

	router
		.route('/')
		.post((0, _post2.default)(model))
		.get((0, _get2.default)(model))

	return router
}

exports.default = create
