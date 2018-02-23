if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import caminte from 'caminte'
const Schema = caminte.Schema
import database from '../../src/config/database'
import UserModel from '../../src/models/user.model'

const User = UserModel(database('rethinkdb'))

/**
 * Simple tests for the Article model
 */
describe('User unit:', () => {
	'use strict'

	let user, id

	beforeAll(done => {
		Schema.autoupdate(done)
	})

	afterAll(done => {
		User.destroyAll(done)
	})

	describe('create', () => {
		user = new User()
		it('user should be object', () => {
			expect(user).toBeInstanceOf('object')
		})

		it('validate', done => {
			user.isValid(valid => {
				expect(valid).toBeTruthy()
				done()
			})
		})
	})

	describe('save', () => {
		it('should be have #save', () => {
			expect(user).toHaveProperty('save')
			expect(user.save).toBeInstanceOf(Function)
		})

		it('call', done => {
			user.save(err => {
				expect(err).toBeFalsy()
				expect(user).toHaveProperty('id')
				expect(user.id).not.toBeNull()
				id = user.id
				done()
			})
		})
	})

	describe('destroy', () => {
		it('should be have #destroy', () => {
			expect(user).toHaveProperty('destroy')
			expect(user.destroy).toBeInstanceOf(Function)
		})

		it('call', done => {
			user.destroy(err => {
				expect(err).toBeFalsy()
				done()
			})
		})
	})
})
