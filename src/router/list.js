import { success } from '../helper/response'
import * as repository from '../lib/repository'

/**
 * list all of the records
 * If an id is present in the url it returns that entry
 * If there is no id it returns all the entries
 *
 * @param {Schema} model The current model
 * @returns {Function} An express-middleware
 */
const __list = model => {
	const list = repository.list(model)

	return (req, res, next) => {
		const { params } = req

		list(params)
			.then(response => {
				success(200, response, res)
			})
			.catch(next)
	}
}

export default __list
