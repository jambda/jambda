if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import connect from '../config/database'
import Model from './model'
const schema = connect('./src/__tests__/config/connector.yml')
const model = new Model(schema)

import postData from './data/post-data'
import invalidPostData from './data/invalid-post-data'

describe('model model:', function() {
	'use strict'
	let id

	beforeAll(done => {
		model.destroyAll(done)
	})

	afterAll(function(done) {
		model.destroyAll(done)
	})

	it('#create invalid', done => {
		model.create(invalidPostData, (err, created) => {
			// @todo validate errors and messages (model.errors is undefined for some reason)
			expect(err).toBeTruthy()
			done()
		})
	})

	it('#create', done => {
		model.create(postData, (err, created) => {
			expect(err).toBeFalsy()
			expect(created).toHaveProperty('id')

			id = created.id
			done()
		})
	})

	it('#exists', done => {
		model.exists(id, (err, exists) => {
			expect(err).toBeNull()
			expect(exists).toEqual(true)

			done()
		})
	})

	it('#findById', done => {
		model.findById(id, (err, found) => {
			expect(err).toBeNull()
			expect(found.id).not.toBeNull()
			done()
		})
	})

	it('#findOne', done => {
		model.findOne(
			{
				where: {
					id: id
				}
			},
			(err, found) => {
				expect(err).toBeNull()
				expect(found.id).toEqual(id)

				done()
			}
		)
	})

	it('#find', done => {
		model.find({}, (err, founds) => {
			expect(err).toBeNull()
			expect(founds.length).toBeGreaterThan(0)

			done()
		})
	})

	it('#all', done => {
		model.all({}, (err, founds) => {
			expect(err).toBeNull()
			expect(founds.length).toBeGreaterThan(0)

			done()
		})
	})

	it('#count', done => {
		model.count({}, (err, count) => {
			expect(err).toBeNull()
			expect(count).toBeGreaterThan(0)

			done()
		})
	})

	it('#destroyById', done => {
		model.destroyById(id, err => {
			expect(err).toBeNull()

			model.findById(id, (err, found) => {
				expect(err).toBeNull()
				expect(found).toBeNull()

				done()
			})
		})
	})

	it('#destroyAll', done => {
		model.destroyAll(err => {
			expect(err).toBeNull()

			model.find({}, (err, founds) => {
				expect(err).toBeNull()
				expect(founds).toHaveLength(0)

				done()
			})
		})
	})

	/*
    describe('properties methods:', function () {

        it('#toString', function () {
            model.should.be.have.property('toString');
            model.toString.should.be.type('function');
        });

        it('#forEachProperty', function () {
            model.should.be.have.property('forEachProperty');
            model.forEachProperty.should.be.type('function');
        });

        it('#registerProperty', function () {
            model.should.be.have.property('registerProperty');
            model.registerProperty.should.be.type('function');
        });

    });

    describe('scope methods:', function () {

        it('#scope', function () {
            model.should.be.have.property('scope');
            model.scope.should.be.type('function');
        });

    });

    describe('query methods:', function () {

        it('#create', function () {
            model.should.be.have.property('create');
            model.create.should.be.type('function');
        });

        it('#exists', function () {
            model.should.be.have.property('exists');
            model.exists.should.be.type('function');
        });

        it('#count', function () {
            model.should.be.have.property('count');
            model.count.should.be.type('function');
        });

        it('#findOrCreate', function () {
            model.should.be.have.property('findOrCreate');
            model.findOrCreate.should.be.type('function');
        });

        it('#findById', function () {
            model.should.be.have.property('findById');
            model.findById.should.be.type('function');
        });

        it('#findOne', function () {
            model.should.be.have.property('findOne');
            model.findOne.should.be.type('function');
        });

        it('#find', function () {
            model.should.be.have.property('find');
            model.find.should.be.type('function');
        });

        it('#all', function () {
            model.should.be.have.property('all');
            model.all.should.be.type('function');
        });

        it('#run', function () {
            model.should.be.have.property('run');
            model.run.should.be.type('function');
        });

        it('#exec', function () {
            model.should.be.have.property('exec');
            model.exec.should.be.type('function');
        });

        it('#update', function () {
            model.should.be.have.property('update');
            model.update.should.be.type('function');
        });

        it('#updateOrCreate', function () {
            model.should.be.have.property('updateOrCreate');
            model.updateOrCreate.should.be.type('function');
        });

        it('#upsert', function () {
            model.should.be.have.property('upsert');
            model.upsert.should.be.type('function');
        });

        it('#destroyAll', function () {
            model.should.be.have.property('destroyAll');
            model.destroyAll.should.be.type('function');
        });

        it('#destroyById', function () {
            model.should.be.have.property('destroyById');
            model.destroyById.should.be.type('function');
        });

        it('#remove', function () {
            model.should.be.have.property('remove');
            model.remove.should.be.type('function');
        });

    });

    describe('relations methods:', function () {
        it('#hasMany', function () {
            model.should.be.have.property('hasMany');
            model.hasMany.should.be.type('function');
        });
        it('#belongsTo', function () {
            model.should.be.have.property('belongsTo');
            model.hasMany.should.be.type('function');
        });
    });

    describe('validations methods:', function () {

        it('#validate', function () {
            model.should.be.have.property('validate');
            model.validate.should.be.type('function');
        });

        it('#validatesPresenceOf', function () {
            model.should.be.have.property('validatesPresenceOf');
            model.validatesPresenceOf.should.be.type('function');
        });

        it('#validatesLengthOf', function () {
            model.should.be.have.property('validatesLengthOf');
            model.validatesLengthOf.should.be.type('function');
        });

        it('#validatesNumericalityOf', function () {
            model.should.be.have.property('validatesNumericalityOf');
            model.validatesNumericalityOf.should.be.type('function');
        });

        it('#validatesInclusionOf', function () {
            model.should.be.have.property('validatesInclusionOf');
            model.validatesInclusionOf.should.be.type('function');
        });

        it('#validatesInclusionOf', function () {
            model.should.be.have.property('validatesInclusionOf');
            model.validatesInclusionOf.should.be.type('function');
        });

        it('#validatesFormatOf', function () {
            model.should.be.have.property('validatesFormatOf');
            model.validatesFormatOf.should.be.type('function');
        });

        it('#validatesUniquenessOf', function () {
            model.should.be.have.property('validatesUniquenessOf');
            model.validatesUniquenessOf.should.be.type('function');
        });

        it('#validateAsync', function () {
            model.should.be.have.property('validateAsync');
            model.validateAsync.should.be.type('function');
        });

    });

    describe('hook methods:', function () {

        it('#afterInitialize', function () {
            model.should.be.have.property('afterInitialize');
            // model.afterInitialize.should.be.type('function');
        });

        it('#beforeValidation', function () {
            model.should.be.have.property('beforeValidation');
            // model.afterInitialize.should.be.type('function');
        });

        it('#afterValidation', function () {
            model.should.be.have.property('afterValidation');
        });

        it('#beforeSave', function () {
            model.should.be.have.property('beforeSave');
        });

        it('#afterSave', function () {
            model.should.be.have.property('afterSave');
        });

        it('#beforeCreate', function () {
            model.should.be.have.property('beforeCreate');
        });

        it('#afterCreate', function () {
            model.should.be.have.property('afterCreate');
        });

        it('#beforeUpdate', function () {
            model.should.be.have.property('beforeUpdate');
        });

        it('#afterUpdate', function () {
            model.should.be.have.property('afterUpdate');
        });

        it('#beforeDestroy', function () {
            model.should.be.have.property('beforeDestroy');
        });

        it('#afterDestroy', function () {
            model.should.be.have.property('afterDestroy');
        });
    });
*/
})
