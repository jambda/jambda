if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import request from 'supertest'
import Model from './model'
import Jambda from '../index'

import postData from './data/post-data'
import putData from './data/put-data'
import patchData from './data/patch-data'
import invalidPostData from './data/invalid-post-data'
import invalidDataTypesPostData from './data/invalid-data-types-post-data'

const application = Jambda('rethinkdb', [Model])
let resourceId, resource

describe('Resource Routes:', function() {
	it('should get a new resource', function(done) {
		return request(application)
			.post('/resource/new')
			.send(postData)
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				const { id, ...rest } = res.body
				expect(rest).toMatchObject(postData)
				resource = res.body
				resourceId = id
				done()
			})
			.catch(done)
	})

	it('should create a new resource', function(done) {
		request(application)
			.post('/resource')
			.send(postData)
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				const { id, ...rest } = res.body
				expect(rest).toMatchObject(postData)
				resource = res.body
				resourceId = id
				done()
			})
			.catch(done)
	})
	/*
	it('should not allow duplicated emails', function(done) {
		request(application)
			.post('/resource')
			.send(duplicatedEmailData)
			.set('Accept', 'application/json')
			.expect(422)
			.then(res => {
				expect(res.body).toHaveProperty('error')
				expect(res.body.error).toEqual('Unprocessable Entity')
				expect(res.body).toHaveProperty('data')
				expect(res.body.data).toHaveProperty('email')

				done()
			})
			.catch(done)
	})

	it('should not allow duplicated usernames', function(done) {
		request(application)
			.post('/resource')
			.send(duplicatedUsernameData)
			.set('Accept', 'application/json')
			.expect(422)
			.then(res => {
				expect(res.body).toHaveProperty('error')
				expect(res.body.error).toEqual('Unprocessable Entity')
				expect(res.body).toHaveProperty('data')
				expect(res.body.data).toHaveProperty('username')

				done()
			})
			.catch(done)
	})
	*/
	it('should list all resources', function(done) {
		request(application)
			.get('/resource')
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body.length).toBeGreaterThan(0)
				done()
			})
			.catch(done)
	})

	it('should count all resources', function(done) {
		request(application)
			.get('/resource/count')
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body).toBeInstanceOf(Object)
				expect(res.body).toHaveProperty('count')
				expect(res.body.count).toBeGreaterThan(0)

				done()
			})
			.catch(done)
	})

	it('should get a single resource', function(done) {
		request(application)
			.get('/resource/' + resourceId)
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body).toBeInstanceOf(Object)
				expect(res.body).toHaveProperty('id')

				resource = res.body
				done()
			})
			.catch(done)
	})

	it('should patch a resource', function(done) {
		request(application)
			.patch('/resource/' + resourceId)
			.set('Accept', 'application/json')
			.send(patchData)
			.expect(200)
			.then(res => {
				const { id, ...rest } = res.body
				// @todo Add more validations to patched data
				expect(rest).toMatchObject(patchData)

				done()
			})
			.catch(err => {
				console.info(err.body)
				done(err)
			})
	})

	it('should put a resource', function(done) {
		request(application)
			.put('/resource/' + resourceId)
			.set('Accept', 'application/json')
			.send(putData)
			.expect(200)
			.then(res => {
				const { id, ...rest } = res.body
				expect(rest).toMatchObject(putData)
				done()
			})
			.catch(err => {
				done(err)
			})
	})

	it('should delete a resource', function(done) {
		request(application)
			.delete('/resource/' + resourceId)
			.set('Accept', 'application/json')
			.expect(204)
			.then(res => {
				expect(res.body).toEqual({})

				done()
			})
			.catch(done)
	})
})
