import uuid from '../../helper/uuid'

export default {
	uuid: uuid(),
	boolean: true,
	string: 'This is a String',
	float: 0.1,
	integer: 10,
	blob: {},
	text:
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the' +
		" industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type " +
		'and scrambled it to make a type specimen book. It has survived not only five centuries, but also the ' +
		'leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with ' +
		'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop ' +
		'publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	json: { test: 'json', test2: 'json2' },
	date: new Date().toISOString()
}
