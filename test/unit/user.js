if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
}

import should from 'should'
import database from '../../src/config/database'
import UserModel from '../../src/models/UserModel'

console.log('DATABASE');
console.log(database);

const User = UserModel(database);


/**
 * Simple tests for the Article model
 */
describe('User unit:', () => {
    'use strict';
    let user, id;

    before((done) => {
        schema.autoupdate(done);
    });

    after((done) => {
        User.destroyAll(done);
    });

    describe('create', () => {

        user = new User();
        it('user should be object', () => {
            user.should.be.type('object');
        });

        it('validate', (done) => {
            user.isValid((valid) => {
                valid.should.be.true;
                if (!valid) console.log(user.errors);
                done();
            });
        });

    });

    describe('save', () => {

        it('should be have #save', () => {
            user.should.be.have.property('save');
            user.save.should.be.type('function');
        });

        it('call', (done) => {
            user.save((err) => {
                should.not.exist(err);
                user.should.be.have.property('id');
                user.id.should.not.eql(null);
                id = user.id;
                done();
            });
        });

    });

    describe('destroy', () => {

        it('should be have #destroy', () => {
            user.should.be.have.property('destroy');
            user.destroy.should.be.type('function');
        });

        it('call', (done) => {
            user.destroy((err) => {
                should.not.exist(err);
                done();
            });
        });

    });
});
