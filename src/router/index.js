import express from 'express'
import __get from './get'
import __post from './post'
import __put from './put'
import __patch from './patch'
import __delete from './delete'
import __new from './new'
import __count from './count'

const router = express.Router()

/**
 * Checks if a api method should be added to a specific Model
 *
 * @param {string} method The method name (NEW, GET, LIST, POST, PUT, PATCH, DELETE)
 * @param {object} model The model
 * @returns {boolean} true if should add false otherwise
 */
const shouldAddRoute = (method, model) => {
	return (
		!model.allow ||
		model.allow.indexOf('ALL') > -1 ||
		model.allow.indexOf(method) > -1 ||
		process.env.NODE_ENV === 'test'
	)
}

/**
 * Creates a new router with the provider prefix
 *
 * @param {Schema} model The model
 * @returns {express.Router} The express router object
 */
const create = model => {
	if (shouldAddRoute('NEW', model)) {
		router.route('/new').post(__new(model))
	}

	if (shouldAddRoute('COUNT', model)) {
		router.route('/count').get(__count(model))
	}

	const routeById = router.route('/:id')

	if (shouldAddRoute('GET', model)) {
		routeById.get(__get(model))
	}

	if (shouldAddRoute('PUT', model)) {
		routeById.put(__put(model))
	}

	if (shouldAddRoute('PATCH', model)) {
		routeById.patch(__patch(model))
	}

	if (shouldAddRoute('DELETE', model)) {
		routeById.delete(__delete(model))
	}

	const route = router.route('/')

	if (shouldAddRoute('POST', model)) {
		route.post(__post(model))
	}

	if (shouldAddRoute('LIST', model)) {
		route.get(__get(model))
	}

	return router
}

export default create
