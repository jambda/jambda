import caminte from 'caminte'
import YAML from 'js-yaml'
const Schema = caminte.Schema
import fs from 'fs'
/**
 * The database connector
 *
 * @param {string} config The connector name
 * @returns {schema.Schema} The connection
 */
const connect = config => {
	let params

	const { database } = YAML.safeLoad(fs.readFileSync(config, 'utf8'))

	switch (process.env.NODE_ENV) {
		case 'production':
			params = database.production
			break
		case 'test':
			params = database.test
			break
		default:
			params = database.development
			break
	}

	const schema = new Schema(params.driver, params)

	schema.autoupdate(() => {})

	return schema
}

export default connect
