import {Schema} from 'caminte'

/**
 *  Define User Model
 *  @param {Object} schema
 *  @return {Object}
 */
 module.exports = function(schema){

    const User = schema.define('user', {
       active : { type : schema.Boolean, default: false },
       validated : { type : schema.Boolean, default: false },
       name : { type : schema.String, index: true },
       username : { type : schema.String, unique: true  },
       email : { type : schema.String, unique: true  },
       password : { type : schema.String },
       created : { type : schema.Date, default: Date.now() }
    },{

    });

    User.validatesPresenceOf('name', 'username', 'email', 'password');
    User.validatesLengthOf('password', {min: 5, message: {min: 'Password is too short'}});
    User.validatesUniquenessOf('username', {message: 'username already exists'});
    User.validatesUniquenessOf('email', {message: 'email already exists'});

    return User;
};