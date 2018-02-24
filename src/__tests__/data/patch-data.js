import uuid from '../../helper/uuid'

export default {
	uuid: uuid(),
	boolean: true,
	string: 'A Patch String',
	float: 0.2,
	integer: 20,
	blob: {},
	text: 'Lorem Ipsum is simply dummy',
	json: { test: 'json3', test2: 'json4' },
	date: new Date().toISOString()
}
