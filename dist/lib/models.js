'use strict'

/**
 *  models loader
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/
var caminte = require('caminte')
var fs = require('fs')
var path = require('path')
var basePath = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	basePath = 'APPS/NANO/lambda-nano-api/src/'
}
console.log(basePath + 'models')

var modelDir = path.resolve(__dirname, basePath + 'models')
console.log(modelDir)

var modelList = fs.readdirSync(modelDir)
var schema = require('../config/database')

caminte.schema = schema
caminte.model = function(name) {
	return caminte.schema.models[name.toLowerCase()]
}
if (!caminte.models) {
	caminte.models = {}
}

var count = modelList.length
for (var m = 0; m < modelList.length; m++) {
	var modelFile = modelList[m]
	if (/Model\.js$/i.test(modelFile)) {
		var modelName = modelFile.replace(/\.js$/i, '')

		caminte.models[modelName] = require(modelDir + '/' + modelName)(schema)

		if (--count === 0) {
			exports.relations()
		}
	}
}

module.exports.init = function(app) {
	console.log('MODULES LOADED')

	if ('function' === typeof schema.autoupdate) {
		if (process.env.AUTOUPDATE) {
			schema.autoupdate(function(err) {
				if (err) {
					console.log(err)
				}
			})
		}
	}

	return app
}

module.exports.relations = function(models) {
	require(modelDir + '/relations').load(models)
}
