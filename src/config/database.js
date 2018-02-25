import caminte from 'caminte'
const Schema = caminte.Schema
import * as config from './config'
/**
 * The database connector
 *
 * @returns {schema.Schema} The connection
 */
const connect = () => {
	let params

	const database = config.get('database')

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
