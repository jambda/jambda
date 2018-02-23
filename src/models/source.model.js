/**
 *  Define User Model
 *  @param {Object} schema The caminte schema instance
 *  @returns {Object} the schema object
 **/
module.exports = function(schema) {
	return schema.define(
		'source',
		{
			active: { type: schema.Boolean, default: false },
			name: { type: schema.String },
			username: { type: schema.String },
			password: { type: schema.String },
			host: { type: schema.String },
			port: { type: schema.Number },
			created: { type: schema.Date, default: Date.now() }
		},
		{}
	)
}
