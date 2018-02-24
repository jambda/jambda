'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _response = require('../helper/response')

var _boom = require('boom')

var _repository = require('../lib/repository')

var repository = _interopRequireWildcard(_repository)

function _interopRequireWildcard(obj) {
	if (obj && obj.__esModule) {
		return obj
	} else {
		var newObj = {}
		if (obj != null) {
			for (var key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key))
					newObj[key] = obj[key]
			}
		}
		newObj.default = obj
		return newObj
	}
}

/**
 * et one or all of the records
 * If an id is present in the url it returns that entry
 * If there is no id it returns all the entries
 *
 * @param {Schema} model The current model
 * @returns {Function} An express-middleware
 */
var __get = function __get(model) {
	var list = repository.list(model)
	var get = repository.get(model)

	return function(req, res, next) {
		var params = req.params

		var promise = params.id ? get(params.id) : list({})

		promise
			.then(function(response) {
				if (params.id && !response) {
					next((0, _boom.notFound)('Record not found!'), res)
				} else {
					;(0, _response.success)(200, response, res)
				}
			})
			.catch(next)
	}
}

exports.default = __get
