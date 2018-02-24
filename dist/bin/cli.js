#!/usr/bin/env node
'use strict'

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

var _fs = require('fs')

var _fs2 = _interopRequireDefault(_fs)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

var program = require('commander')

program
	.version('1.0.0')
	.usage('[options] <file ...>')
	.option('-p, --peppers', 'Add peppers')
	.option('-P, --pineapple', 'Add pineapple')
	.option('-b, --bbq-sauce', 'Add bbq sauce')
	.option(
		'-c, --cheese [type]',
		'Add the specified type of cheese [marble]',
		'marble'
	)
	.parse(process.argv)
