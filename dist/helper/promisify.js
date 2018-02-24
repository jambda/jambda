'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
/**
 * Promisify a callback based function
 *
 * @param {Function} fn the function to promisify
 * @returns {Promise<any>} The promise
 */
var promisify = function promisify(fn) {
	return new Promise(function(resolve, reject) {
		fn(function() {
			for (
				var _len = arguments.length, args = Array(_len), _key = 0;
				_key < _len;
				_key++
			) {
				args[_key] = arguments[_key]
			}

			if (args[0] !== null && args[0] !== undefined) {
				reject(args[0])
			} else {
				args.splice(0, 1)
				resolve.apply(undefined, args)
			}
		})
	})
}

exports.default = promisify
