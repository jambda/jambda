if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import events from 'events'
import Model from './model'
import Jambda from './../index'
const jambda = new Jambda('rethinkdb', [Model])

describe('Jambda', () => {
	it('should return an Express app if NODE_ENV === "test"', () => {
		expect(jambda.constructor).toEqual(events.EventEmitter)
	})

	it('should return a Serverless-http instance if NODE_ENV !== "test', () => {
		process.env.NODE_ENV = 'development'
		const jambda = new Jambda('rethinkdb', [Model])
		expect(jambda).toBeInstanceOf(Function)
		process.env.NODE_ENV = 'test'
	})

	describe("Check Middleware's", () => {
		const findMw = m => {
			const mw = jambda._router.stack.filter(
				middleware => middleware.handle.name === m
			)
			return mw.length > 0 ? true : false
		}

		it('should have a compression middleware', () => {
			expect(findMw('compression')).toBeTruthy()
		})

		it('should have a corsMiddleware middleware', () => {
			expect(findMw('corsMiddleware')).toBeTruthy()
		})

		it('should have a jsonParser middleware', () => {
			expect(findMw('jsonParser')).toBeTruthy()
		})

		it('should have a urlencodedParser middleware', () => {
			expect(findMw('urlencodedParser')).toBeTruthy()
		})

		it('should have a error middleware', () => {
			expect(findMw('error')).toBeTruthy()
		})
	})
})
