import uuid from '../../helper/uuid'

export default {
	uuid: uuid(),
	boolean: true,
	string: 'This is a Put String',
	float: 0.2,
	integer: 20,
	blob: {},
	text:
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the',
	json: { test: 'json3', test2: 'json4' },
	date: new Date().toISOString()
}
