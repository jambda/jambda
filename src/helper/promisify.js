/**
 * Promisify a callback based function
 *
 * @param {Function} fn the function to promisify
 * @returns {Promise<any>} The promise
 */
const promisify = fn => {
	return new Promise((resolve, reject) => {
		fn((...args) => {
			if (args[0] !== null && args[0] !== undefined) {
				reject(args[0])
			} else {
				args.splice(0, 1)
				resolve(...args)
			}
		})
	})
}

export default promisify
