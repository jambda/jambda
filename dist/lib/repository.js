'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
exports.truncate = exports.destroy = exports.create = exports.put = exports.patch = exports.get = exports.empty = exports.count = exports.list = undefined

var _underscore = require('underscore')

var _boom = require('boom')

var _boom2 = _interopRequireDefault(_boom)

var _validate = require('../helper/validate')

var _validate2 = _interopRequireDefault(_validate)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * LIST records from a database
 *
 * @param {Schema} model The current model
 * @returns {function(*): Promise<any>} The list function
 */
var list = (exports.list = function list(model) {
	return function(params) {
		return new Promise(function(resolve, reject) {
			var query = params
			var skip = query.skip ? parseInt(query.skip) - 1 : 0
			var limit = query.limit ? parseInt(query.limit) : 20

			var opts = {
				skip: skip,
				limit: limit,
				where: {}
			}

			delete query.skip
			delete query.limit

			// TODO: it needs implementation for search
			;(0, _underscore.extend)(opts.where, query)

			model.all(opts, function(err, users) {
				if (err) {
					return reject(err)
				}

				return resolve(users)
			})
		})
	}
})

/**
 * COUNT records from a database
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The count function
 */
var count = (exports.count = function count(model) {
	return function(query) {
		return new Promise(function(resolve, reject) {
			var opts = {
				where: {}

				// TODO: it needs implementation
			}
			;(0, _underscore.extend)(opts.where, query)

			model.count(opts.where, function(err, count) {
				if (err) {
					return reject(err)
				}
				return resolve({ count: count })
			})
		})
	}
})

/**
 * GET an EMPTY record from the schema manager
 *
 * @param {Schema} model The current model
 * @returns {function(*=): (Object|*)} The empty function
 */
var empty = (exports.empty = function empty(model) {
	return function(params) {
		var newResource = new model(params)
		return newResource.toObject()
	}
})

/**
 * GET a record from the database
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The get function
 */
var get = (exports.get = function get(model) {
	return function(user_id) {
		return new Promise(function(resolve, reject) {
			model.findById(user_id, function(err, user) {
				if (err) {
					return reject(err)
				}

				return resolve(user)
			})
		})
	}
})

/**
 * PATCH a record on the database
 *
 * @param {Schema} model The current model
 * @returns {function(*=, *=): Promise<any>} The patch function
 */
var patch = (exports.patch = function patch(model) {
	return function(id, payload) {
		return new Promise(function(resolve, reject) {
			get(model)(id)
				.then(function(user) {
					if (!user) {
						return resolve()
					}

					;(0, _underscore.extend)(user, payload)

					;(0, _validate2.default)(user, reject, function(user) {
						user.save(function(err) {
							if (err) {
								return reject(err) //reject(boom.badRequest(err.message || err).output.payload)
							}

							return resolve(user)
						})
					})
				})
				.catch(reject)
		})
	}
})

/**
 * PUT a record on the database
 *
 * @param {Schema} model The current model
 * @returns {function(*=, *=): Promise<any>} The put function
 */
var put = (exports.put = function put(model) {
	return function(id, payload) {
		return new Promise(function(resolve, reject) {
			get(model)(id)
				.then(function(found) {
					if (!found) {
						return resolve()
					}

					payload.id = id
					var resource = new model(payload)

					;(0, _validate2.default)(resource, reject, function() {
						resource.save(function(err) {
							if (err) {
								return reject(err) //reject(boom.badRequest(err.message || err).output.payload)
							}

							return resolve(resource)
						})
					})
				})
				.catch(reject)
		})
	}
})

/**
 * CREATE a record on a database
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The create function
 */
var create = (exports.create = function create(model) {
	return function(payload) {
		return new Promise(function(resolve, reject) {
			var newResource = new model(payload)

			;(0, _validate2.default)(newResource, reject, function(user) {
				user.save(function(err) {
					if (err) {
						return reject(
							_boom2.default.badRequest(err.message || err).output
								.payload
						) //res.status(400);
					}
					return resolve(newResource.toObject()) //res.status(201);
				})
			})
		})
	}
})

/**
 * Delete action, deletes a single user
 * Default mapping to DEL '~/users/:id', no GET mapping
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The destroy function
 */
var destroy = (exports.destroy = function destroy(model) {
	return function(user_id) {
		return new Promise(function(resolve, reject) {
			model.findById(user_id, function(err, user) {
				if (err) {
					reject(err)
				}

				if (!user) {
					return resolve()
				}

				model.destroyById(user_id, function(err) {
					if (err) {
						return reject(err)
					}

					return resolve()
				})
			})
		})
	}
})

/**
 * Delete action, deletes a all users
 * Default mapping to DEL '~/users', no GET mapping
 *
 * @param {Schema} model The current model
 * @returns {function(): Promise<any>} The truncate function
 */
var truncate = (exports.truncate = function truncate(model) {
	return function() {
		return new Promise(function(resolve, reject) {
			model.destroyAll(function(err) {
				if (err) {
					return reject(
						_boom2.default.badRequest(err.message || err).output
							.payload
					)
				} else {
					resolve()
				}
			})
		})
	}
})
