import { extend } from 'underscore'
import boom from 'boom'
import validate from '../helper/validate'

/**
 * LIST records from a database
 *
 * @param {Schema} model The current model
 * @returns {function(*): Promise<any>} The list function
 */
export const list = model => params => {
	return new Promise((resolve, reject) => {
		let query = params
		let skip = query.skip ? parseInt(query.skip) - 1 : 0
		let limit = query.limit ? parseInt(query.limit) : 20

		let opts = {
			skip: skip,
			limit: limit,
			where: {}
		}

		delete query.skip
		delete query.limit

		// TODO: it needs implementation for search
		extend(opts.where, query)

		model.all(opts, (err, users) => {
			if (err) {
				return reject(err)
			}

			return resolve(users)
		})
	})
}

/**
 * COUNT records from a database
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The count function
 */
export const count = model => query => {
	return new Promise((resolve, reject) => {
		let opts = {
			where: {}
		}

		// TODO: it needs implementation
		extend(opts.where, query)

		model.count(opts.where, (err, count) => {
			if (err) {
				return reject(err)
			}
			return resolve({ count: count })
		})
	})
}

/**
 * GET an EMPTY record from the schema manager
 *
 * @param {Schema} model The current model
 * @returns {function(*=): (Object|*)} The empty function
 */
export const empty = model => params => {
	let newResource = new model(params)
	return newResource.toObject()
}

/**
 * GET a record from the database
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The get function
 */
export const get = model => user_id => {
	return new Promise((resolve, reject) => {
		model.findById(user_id, (err, user) => {
			if (err) {
				return reject(err)
			}

			return resolve(user)
		})
	})
}

/**
 * PATCH a record on the database
 *
 * @param {Schema} model The current model
 * @returns {function(*=, *=): Promise<any>} The patch function
 */
export const patch = model => (id, payload) => {
	return new Promise((resolve, reject) => {
		get(model)(id)
			.then(user => {
				if (!user) {
					return resolve()
				}

				extend(user, payload)

				validate(user, reject, user => {
					user.save(err => {
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

/**
 * PUT a record on the database
 *
 * @param {Schema} model The current model
 * @returns {function(*=, *=): Promise<any>} The put function
 */
export const put = model => (id, payload) => {
	return new Promise((resolve, reject) => {
		get(model)(id)
			.then(found => {
				if (!found) {
					return resolve()
				}

				payload.id = id
				const resource = new model(payload)

				validate(resource, reject, () => {
					resource.save(err => {
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

/**
 * CREATE a record on a database
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The create function
 */
export const create = model => payload => {
	return new Promise((resolve, reject) => {
		let newResource = new model(payload)

		validate(newResource, reject, user => {
			user.save(err => {
				if (err) {
					return reject(
						boom.badRequest(err.message || err).output.payload
					) //res.status(400);
				}
				return resolve(newResource.toObject()) //res.status(201);
			})
		})
	})
}

/**
 * Delete action, deletes a single user
 * Default mapping to DEL '~/users/:id', no GET mapping
 *
 * @param {Schema} model The current model
 * @returns {function(*=): Promise<any>} The destroy function
 */
export const destroy = model => user_id => {
	return new Promise((resolve, reject) => {
		model.findById(user_id, (err, user) => {
			if (err) {
				reject(err)
			}

			if (!user) {
				return resolve()
			}

			model.destroyById(user_id, err => {
				if (err) {
					return reject(err)
				}

				return resolve()
			})
		})
	})
}

/**
 * Delete action, deletes a all users
 * Default mapping to DEL '~/users', no GET mapping
 *
 * @param {Schema} model The current model
 * @returns {function(): Promise<any>} The truncate function
 */
export const truncate = model => () => {
	return new Promise((resolve, reject) => {
		model.destroyAll(err => {
			if (err) {
				return reject(
					boom.badRequest(err.message || err).output.payload
				)
			} else {
				resolve()
			}
		})
	})
}
