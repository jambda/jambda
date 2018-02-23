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
 * Creates a new router with the provider prefix
 *
 * @param {Schema} model The model
 * @returns {express.Router} The express router object
 */
const create = model => {
	router.route('/new').post(__new(model))

	router.route('/count').get(__count(model))

	router
		.route('/:id')
		.get(__get(model))
		.put(__put(model))
		.patch(__patch(model))
		.delete(__delete(model))

	router
		.route('/')
		.post(__post(model))
		.get(__get(model))

	return router
}

export default create
