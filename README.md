# Jambda

#### The easiest way to deploy database connected rest api's in a serverless platform.

**This project is still under development and will be open for pull request's soon.**

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/650bb0ae80ec4bfab67f3e630496529b)](https://www.codacy.com/app/layoutzweb/jambda?utm_source=github.com&utm_medium=referral&utm_content=layoutzweb/jambda&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/layoutzweb/jambda.svg?branch=master)](https://travis-ci.org/layoutzweb/jambda)
[![npm](https://img.shields.io/npm/dt/express.svg)]()

Jambda was created out of my desire to get better at node and get more experience with
serverless platforms.

## How it works

Jambda leverages a few awesome open-source tools to abstract most of the heavy work
we have when building rest-spi's, error handling, logging, authentication, tests &
deployment. Here are the main ones:

* [Serverless](https://serverless.com) Toolkit for deploying and operating serverless architectures
* [Express](https://expressjs.com/) Fast, unopinionated, minimalist web framework for Node.js
* [Caminte](https://github.com/biggora/caminte) Cross-Db ORM for NodeJs

This way you have more time to focus on the business logic of your product.

## Connectors

The nice thing about Jambda is that it is able to connect to multiple data sources
right of the bet! Yep, you heard it right, as of now you can connect to the following:

* [Redis](https://redis.io/)
* [Rethink Db](https://www.rethinkdb.com/)
* [MySql Db](https://www.mysql.com/)
* [Maria Db](https://mariadb.org/)
* [Mongo Db](https://www.mongodb.com/)
* [Arango Db](https://www.arangodb.com/)
* [Firebase](https://firebase.google.com/)

## How to use it

Jambda is easy to implement and launch, follow this easy steps:

```javascript
import Jambda from 'jambda'
```

Create at least one model representing a database table you want to serve as a restful api:

```javascript
 export default model = (schema) => {

    const ModelName = schema.define('user', {
       active : { type : schema.Boolean, default: false },
       validated : { type : schema.Boolean, default: false },
       name : { type : schema.String, index: true },
       username : { type : schema.String, unique: true  },
       email : { type : schema.String, unique: true  },
       password : { type : schema.String },
       created : { type : schema.Date, default: Date.now() }
    },{

    });

    return ModelName;
})
```

Models are based on the [Ceminte Cross-Db ORM](https://github.com/biggora/caminte) package, they have an awesome model
creator that you can use to create your first model's. [Model Creator](http://www.camintejs.com/en/creator)

Create an instance of Jambda passing the connector name currently one of: redis, rethinkdb, mysqldb, mariadb, mongodb,
arangodb, firebase, and an array of models.

```javascript
export const handler = Jambda([connector], [model1, model2, ...])
```

Done! You have your self a REST api for every single model you have passed in to Jambda!

## How to run it locally

To run your lambda REST api locally Jambda provides the offline command, to run it type on the console:

```javascript
yarn offline
```

Once the server is up, you will have the following endpoints at your service:

##### NEW a Record

> GET /[:tablename]

##### LIST Records

> GET /[tablename]

##### GET a Record

> GET /[:tablename]/[:id]

##### COUNT Records

> GET /[tablename]/count

##### POST a Record

> POST /[:tablename]

##### PATCH a Record

> PATCH /[:tablename]/[:id]

##### PUT a Record

> PUT /[:tablename]

##### DELETE a Record

> DELETE /[:tablename]/[:id]

## Options

There are currently a few options you can use to customize Jambda:

```json
{
	"database": {}
}
```
