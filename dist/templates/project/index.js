'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
exports.handler = undefined

var _dotenv = require('dotenv')

var _dotenv2 = _interopRequireDefault(_dotenv)

var _jambda = require('jambda')

var _jambda2 = _interopRequireDefault(_jambda)

var _user = require('./models/user.model')

var _user2 = _interopRequireDefault(_user)

var _source = require('./models/source.model')

var _source2 = _interopRequireDefault(_source)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

_dotenv2.default.config()
var handler = (exports.handler = (0, _jambda2.default)('rethinkdb', [
	_user2.default,
	_source2.default
]))
