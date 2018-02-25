/**
 *  Define Model
 *  @param {Object} schema The caminte schema instance
 *  @returns {Object} the schema object
 */
module.exports = function(schema) {
	const Model = schema.define(
		'resource',
		{
			uuid: { type: schema.UUID, unique: true },
			boolean: { type: schema.Boolean, default: false },
			string: { type: schema.String, index: true },
			float: { type: schema.Float },
			integer: { type: schema.Int },
			blob: { type: schema.Blob },
			text: { type: schema.Text },
			json: { type: schema.JSON },
			date: { type: schema.Date, default: Date.now() }
		},
		{}
	)

	Model.validatesPresenceOf(
		'uuid',
		'boolean',
		'string',
		'float',
		'integer',
		'blob',
		'text',
		'json',
		'date'
	)

	Model.allow = ['GET', 'LIST']

	Model.validatesUniquenessOf('uuid')

	Model.validatesLengthOf('string', {
		min: 5,
		max: 20,
		message: {
			min: 'String is too short',
			max: 'String is too long'
		}
	})

	Model.validatesNumericalityOf('float', {
		message: 'Must be a float'
	})

	Model.validatesNumericalityOf('integer', {
		message: 'Must be an integer'
	})

	return Model
}
