import fs from 'fs'
import YAML from 'js-yaml'

let config = {}

/**
 * Gets a config value by key
 *
 * @param {string} key The config key
 * @param {any} defaultValue The default value if the key is not set. If set to false, it will throw an Error if the key does not exist
 * @returns {*} The found value or the default value if set
 */
export const get = (key, defaultValue = null) => {
	if (config.hasOwnProperty(key)) {
		return config[key]
	}

	if (defaultValue === false) {
		throw new Error(
			`Config with key "${key}" was not found and default value was not allowed!`
		)
	}

	return defaultValue
}

/**
 * Loads a YML config file into the config object
 *
 * @param {string} configFile the config file path
 * @returns {boolean} True if loading was complete
 * @throws {Error} If it can't load the file
 */
export const load = configFile => {
	const file = YAML.safeLoad(fs.readFileSync(configFile, 'utf8'))
	config = { ...config, ...file }
	return true
}

/**
 * Persists a config key and value to the config object
 *
 * @param {string} key The config key. It cannot be an existing key, not possible to overwrite values
 * @param {*} value The value to be set
 * @returns {boolean} True if the key does not exist
 * @throws {Error} If the key passed already exist in the config object
 */
export const set = (key, value) => {
	if (config.hasOwnProperty(key)) {
		throw new Error(
			`Config with key "${key}" already exists, please choose another key!`
		)
	}

	config[key] = value
	return true
}

/**
 * Checks if a key exists in the config object
 *
 * @param {string} key The config key to check
 * @returns {boolean} True if it exists False otherwise
 */
export const has = key => {
	return config.hasOwnProperty(key)
}
