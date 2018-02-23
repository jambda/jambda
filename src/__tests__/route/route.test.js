if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import request from 'supertest'
import model from '../../models/user.model'
import Jambda from './../../index'

import userData from '../../data/user.json'
import putUserData from '../../data/put-user.json'
import duplicatedEmailData from '../../data/duplicated-email-user.json'
import duplicatedUsernameData from '../../data/duplicated-username-user.json'

const application = Jambda('rethinkdb', [model])
let id, user

describe('Resource Routes:', function() {
	it('should get a new resource', function(done) {
		return request(application)
			.post('/user/new')
			.send(userData)
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body).toBeInstanceOf(Object)
				expect(res.body.id).toBeNull()
				expect(res.body.name).toEqual(userData.name)
				expect(res.body.username).toEqual(userData.username)
				expect(res.body.email).toEqual(userData.email)
				expect(res.body.password).toEqual(userData.password)
				expect(res.body).toHaveProperty('validated')
				expect(res.body.validated).toEqual(false)
				expect(res.body).toHaveProperty('active')
				expect(res.body.active).toEqual(false)
				expect(res.body).toHaveProperty('created')

				user = res.body
				done()
			})
			.catch(done)
	})

	it('should create a new resource', function(done) {
		request(application)
			.post('/user')
			.send(user)
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body).toBeInstanceOf(Object)
				expect(res.body.id).not.toBeNull()
				expect(res.body.name).toEqual(userData.name)
				expect(res.body.username).toEqual(userData.username)
				expect(res.body.email).toEqual(userData.email)
				expect(res.body.password).toEqual(userData.password)
				expect(res.body).toHaveProperty('validated')
				expect(res.body.validated).toEqual(false)
				expect(res.body).toHaveProperty('active')
				expect(res.body.active).toEqual(false)
				expect(res.body).toHaveProperty('created')

				id = res.body.id
				done()
			})
			.catch(done)
	})

	it('should not allow duplicated emails', function(done) {
		request(application)
			.post('/user')
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
			.post('/user')
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

	it('should list all resources', function(done) {
		request(application)
			.get('/user')
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
			.get('/user/count')
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
			.get('/user/' + id)
			.set('Accept', 'application/json')
			.expect(200)
			.then(res => {
				expect(res.body).toBeInstanceOf(Object)
				expect(res.body).toHaveProperty('id')

				user = res.body
				done()
			})
			.catch(done)
	})

	it('should patch a resource', function(done) {
		const NEW_TITLE = 'User Name Updated'

		request(application)
			.patch('/user/' + id)
			.set('Accept', 'application/json')
			.send({ name: NEW_TITLE })
			.expect(200)
			.then(res => {
				expect(res.body).toBeInstanceOf(Object)
				expect(res.body).toHaveProperty('id')
				expect(res.body).toHaveProperty('name')
				expect(res.body.name).toEqual(NEW_TITLE)

				done()
			})
			.catch(err => {
				done(err)
			})
	})

	it('should put a resource', function(done) {
		request(application)
			.put('/user/' + id)
			.set('Accept', 'application/json')
			.send(putUserData)
			.expect(200)
			.then(res => {
				expect(res.body).toBeInstanceOf(Object)
				expect(res.body.id).not.toBeNull()
				expect(res.body.name).toEqual(putUserData.name)
				expect(res.body.username).toEqual(putUserData.username)
				expect(res.body.email).toEqual(putUserData.email)
				expect(res.body.password).toEqual(putUserData.password)
				expect(res.body).toHaveProperty('validated')
				expect(res.body.validated).toEqual(true)
				expect(res.body).toHaveProperty('active')
				expect(res.body.active).toEqual(true)
				expect(res.body).toHaveProperty('created')

				done()
			})
			.catch(err => {
				done(err)
			})
	})

	it('should delete a resource', function(done) {
		request(application)
			.delete('/user/' + id)
			.set('Accept', 'application/json')
			.expect(204)
			.then(res => {
				expect(res.body).toEqual({})

				done()
			})
			.catch(done)
	})
})
