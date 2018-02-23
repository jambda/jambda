if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'test'
}

import schema from './../../src/config/database'
const model = require('../../src/models/user.model')
const User = new model(schema)

console.log('USER')
console.log(User)

import userData from './../data/user.json'

describe('User model:', function() {
	'use strict'
	let id

	beforeAll(function(done) {
		schema.autoupdate(done)
	})

	afterAll(function(done) {
		User.destroyAll(done)
	})

	it('#create', done => {
		User.create(userData, (err, created) => {
			expect(err).toBeNull()
			expect(created).toHaveProperty('id')

			id = created.id
			done()
		})
	})

	it('#exists', done => {
		User.exists(id, (err, exists) => {
			expect(err).toBeNull()
			expect(exists).toEqual(true)

			done()
		})
	})

	it('#findById', done => {
		User.findById(id, (err, found) => {
			expect(err).toBeNull()
			expect(found.id).not.toBeNull()
			done()
		})
	})

	it('#findOne', done => {
		User.findOne(
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
		User.find({}, (err, founds) => {
			expect(err).toBeNull()
			expect(founds.length).toBeGreaterThan(0)

			done()
		})
	})

	it('#all', done => {
		User.all({}, (err, founds) => {
			expect(err).toBeNull()
			expect(founds.length).toBeGreaterThan(0)

			done()
		})
	})

	it('#count', done => {
		User.count({}, (err, count) => {
			expect(err).toBeNull()
			expect(count).toBeGreaterThan(0)

			done()
		})
	})

	it('#destroyById', done => {
		User.destroyById(id, err => {
			expect(err).toBeNull()

			User.findById(id, (err, found) => {
				expect(err).toBeNull()
				expect(found).toBeNull()

				done()
			})
		})
	})

	it('#destroyAll', done => {
		User.destroyAll(err => {
			expect(err).toBeNull()

			User.find({}, (err, founds) => {
				expect(err).toBeUndefined()
				expect(founds.length).toEqual(0)

				done()
			})
		})
	})

	/*
    describe('properties methods:', function () {

        it('#toString', function () {
            User.should.be.have.property('toString');
            User.toString.should.be.type('function');
        });

        it('#forEachProperty', function () {
            User.should.be.have.property('forEachProperty');
            User.forEachProperty.should.be.type('function');
        });

        it('#registerProperty', function () {
            User.should.be.have.property('registerProperty');
            User.registerProperty.should.be.type('function');
        });

    });

    describe('scope methods:', function () {

        it('#scope', function () {
            User.should.be.have.property('scope');
            User.scope.should.be.type('function');
        });

    });

    describe('query methods:', function () {

        it('#create', function () {
            User.should.be.have.property('create');
            User.create.should.be.type('function');
        });

        it('#exists', function () {
            User.should.be.have.property('exists');
            User.exists.should.be.type('function');
        });

        it('#count', function () {
            User.should.be.have.property('count');
            User.count.should.be.type('function');
        });

        it('#findOrCreate', function () {
            User.should.be.have.property('findOrCreate');
            User.findOrCreate.should.be.type('function');
        });

        it('#findById', function () {
            User.should.be.have.property('findById');
            User.findById.should.be.type('function');
        });

        it('#findOne', function () {
            User.should.be.have.property('findOne');
            User.findOne.should.be.type('function');
        });

        it('#find', function () {
            User.should.be.have.property('find');
            User.find.should.be.type('function');
        });

        it('#all', function () {
            User.should.be.have.property('all');
            User.all.should.be.type('function');
        });

        it('#run', function () {
            User.should.be.have.property('run');
            User.run.should.be.type('function');
        });

        it('#exec', function () {
            User.should.be.have.property('exec');
            User.exec.should.be.type('function');
        });

        it('#update', function () {
            User.should.be.have.property('update');
            User.update.should.be.type('function');
        });

        it('#updateOrCreate', function () {
            User.should.be.have.property('updateOrCreate');
            User.updateOrCreate.should.be.type('function');
        });

        it('#upsert', function () {
            User.should.be.have.property('upsert');
            User.upsert.should.be.type('function');
        });

        it('#destroyAll', function () {
            User.should.be.have.property('destroyAll');
            User.destroyAll.should.be.type('function');
        });

        it('#destroyById', function () {
            User.should.be.have.property('destroyById');
            User.destroyById.should.be.type('function');
        });

        it('#remove', function () {
            User.should.be.have.property('remove');
            User.remove.should.be.type('function');
        });

    });

    describe('relations methods:', function () {
        it('#hasMany', function () {
            User.should.be.have.property('hasMany');
            User.hasMany.should.be.type('function');
        });
        it('#belongsTo', function () {
            User.should.be.have.property('belongsTo');
            User.hasMany.should.be.type('function');
        });
    });

    describe('validations methods:', function () {

        it('#validate', function () {
            User.should.be.have.property('validate');
            User.validate.should.be.type('function');
        });

        it('#validatesPresenceOf', function () {
            User.should.be.have.property('validatesPresenceOf');
            User.validatesPresenceOf.should.be.type('function');
        });

        it('#validatesLengthOf', function () {
            User.should.be.have.property('validatesLengthOf');
            User.validatesLengthOf.should.be.type('function');
        });

        it('#validatesNumericalityOf', function () {
            User.should.be.have.property('validatesNumericalityOf');
            User.validatesNumericalityOf.should.be.type('function');
        });

        it('#validatesInclusionOf', function () {
            User.should.be.have.property('validatesInclusionOf');
            User.validatesInclusionOf.should.be.type('function');
        });

        it('#validatesInclusionOf', function () {
            User.should.be.have.property('validatesInclusionOf');
            User.validatesInclusionOf.should.be.type('function');
        });

        it('#validatesFormatOf', function () {
            User.should.be.have.property('validatesFormatOf');
            User.validatesFormatOf.should.be.type('function');
        });

        it('#validatesUniquenessOf', function () {
            User.should.be.have.property('validatesUniquenessOf');
            User.validatesUniquenessOf.should.be.type('function');
        });

        it('#validateAsync', function () {
            User.should.be.have.property('validateAsync');
            User.validateAsync.should.be.type('function');
        });

    });

    describe('hook methods:', function () {

        it('#afterInitialize', function () {
            User.should.be.have.property('afterInitialize');
            // User.afterInitialize.should.be.type('function');
        });

        it('#beforeValidation', function () {
            User.should.be.have.property('beforeValidation');
            // User.afterInitialize.should.be.type('function');
        });

        it('#afterValidation', function () {
            User.should.be.have.property('afterValidation');
        });

        it('#beforeSave', function () {
            User.should.be.have.property('beforeSave');
        });

        it('#afterSave', function () {
            User.should.be.have.property('afterSave');
        });

        it('#beforeCreate', function () {
            User.should.be.have.property('beforeCreate');
        });

        it('#afterCreate', function () {
            User.should.be.have.property('afterCreate');
        });

        it('#beforeUpdate', function () {
            User.should.be.have.property('beforeUpdate');
        });

        it('#afterUpdate', function () {
            User.should.be.have.property('afterUpdate');
        });

        it('#beforeDestroy', function () {
            User.should.be.have.property('beforeDestroy');
        });

        it('#afterDestroy', function () {
            User.should.be.have.property('afterDestroy');
        });
    });
*/
})
