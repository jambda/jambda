if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import connect from '../config/database'
const schema = connect('rethinkdb')
import Model from './model'

const Resource = new Model(schema)
import postData from './data/post-data'

/**
 * Simple tests for the Article model
 */
describe('User unit:', () => {
	'use strict'

	let resource, id

	beforeAll(done => {
		Resource.destroyAll(done)
	})

	afterAll(done => {
		Resource.destroyAll(done)
	})

	describe('create', () => {
		resource = new Resource(postData)
		it('user should be object', () => {
			expect(resource).toBeInstanceOf(Object)
		})

		it('validate', done => {
			resource.isValid(valid => {
				expect(valid).toBeTruthy()
				done()
			})
		})
	})

	describe('save', () => {
		it('should be have #save', () => {
			expect(resource).toHaveProperty('save')
			expect(resource.save).toBeInstanceOf(Function)
		})

		it('call', done => {
			resource.save(err => {
				expect(err).toBeFalsy()
				expect(resource).toHaveProperty('id')
				expect(resource.id).not.toBeNull()
				id = resource.id
				done()
			})
		})
	})

	describe('destroy', () => {
		it('should be have #destroy', () => {
			expect(resource).toHaveProperty('destroy')
			expect(resource.destroy).toBeInstanceOf(Function)
		})

		it('call', done => {
			resource.destroy(err => {
				expect(err).toBeFalsy()
				done()
			})
		})
	})
})
