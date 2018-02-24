'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _response = require('../helper/response')

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
 * Counts the number of records in a model
 *
 * @param {Schema} model The model
 * @returns {Function} The count function
 * @private
 */
var __count = function __count(model) {
	var count = repository.count(model)

	return function(req, res, next) {
		count()
			.then(function(response) {
				;(0, _response.success)(200, response, res)
			})
			.catch(next)
	}
}

exports.default = __count
