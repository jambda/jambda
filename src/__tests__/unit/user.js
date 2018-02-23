if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import connect from '../../config/database'
const schema = connect('rethinkdb')
import UserModel from '../../models/user.model'

const User = new UserModel(schema)
import userData from '../../data/user.json'

/**
 * Simple tests for the Article model
 */
describe('User unit:', () => {
	'use strict'

	let user, id

	beforeAll(done => {
		User.destroyAll(done)
	})

	afterAll(done => {
		User.destroyAll(done)
	})

	describe('create', () => {
		user = new User(userData)
		it('user should be object', () => {
			expect(user).toBeInstanceOf(Object)
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
