# Jambda

#### The easiest way to deploy database connected rest api's in a serverless platform.

**This project is still under development and will be open for pull request's soon.**

[![npm](https://img.shields.io/npm/v/jambda.svg)](https://www.npmjs.com/package/jambda)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/650bb0ae80ec4bfab67f3e630496529b)](https://www.codacy.com/app/layoutzweb/jambda?utm_source=github.com&utm_medium=referral&utm_content=layoutzweb/jambda&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-jambda.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/layoutzweb/jambda.svg?branch=master)](https://travis-ci.org/layoutzweb/jambda)
[![NPM Downloads](https://img.shields.io/npm/dm/jambda.svg?style=flat)](https://www.npmjs.org/package/jambda)

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

It uses Express and Caminte to create a resource based rest api, that can be connected to many different
Sql & NoSql databases & deployed to AWS Lambda using the awesome Serverless Platform.

## Jambda & Serverless

All thought Jambda does not use [Serverless](https://serverless.com) directly, it was made to work side
by side with the serverless platform.
Over time the goal is to develop mechanisms to help make this a more seamless integration.

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

Follew this steps:

#### Install Jambda

Use NPM:

```javascript
npm install jambda --save
```

Or use yarn

```javascript
yarn add jambda
```

#### Import it into your project

Jambda is easy to implement and launch, follow this easy steps:

```javascript
import Jambda from 'jambda'
```

#### Create model's

Create at least one model representing a database table you want to serve as a restful api,
if the table does not exist it will be created on your first request:

```javascript
 export default model = (schema) => {

    const FirstModel = schema.define('user', {
       active : { type : schema.Boolean, default: false },
       validated : { type : schema.Boolean, default: false },
       name : { type : schema.String, index: true },
       username : { type : schema.String, unique: true  },
       email : { type : schema.String, unique: true  },
       password : { type : schema.String },
       created : { type : schema.Date, default: Date.now() }
    },{

    });

    /**
     * Methods
     * Configure which methods should be available for this resource.
     * * ALL adds all available methods [GET, LIST, POST, PUT, PATCH, DELETE, NEW, COUNT]
     * * Or you can pass only the ones you want to make available (eg: [GET, LIST]
     **/
    FirstModel.allow = ['ALL']

    /**
     * Validations
     * The currently available validation methos are:
     * validatesPresenceOf([field_name], [field_name])
     * validatesLengthOf([field_name], {min: 5, message: {min: 'Value is too short'}});
     * validatesInclusionOf([field_name], {in: ['value1', 'value2']});
     * validatesExclusionOf([field_name], {in: ['value1', 'value2', 'value3']});
     * validatesNumericalityOf([field_name], {int: true});
     * validatesUniquenessOf([field_name], {message: 'Field is not unique'});
     * validate([field_name], [validationFunction (err)], {message: 'Bad name'}]
     **/
    FirstModel.validatesPresenceOf(
		'uuid',
		'boolean',
		'string',
		'float',
		'integer',
		'blob',
		'text',
		'json',
		'date'
	)
    FirstModel.validatesUniquenessOf('username')

    return FirstModel;
})
```

Models are based on the [Ceminte Cross-Db ORM](https://github.com/biggora/caminte) package, they have an awesome model
creator that you can use to create your first model's. [Model Creator](http://www.camintejs.com/en/creator)

#### Create a Jambda configuration file

This is the minimun configuration needed for Jambda to run:

```
name: 'resource'
database:
  production:
    driver: 'rethinkdb'
    host: '127.0.0.1'
    port: 32773
    database: 'test_api'
    autoReconnect: true

  development:
    driver: 'rethinkdb'
    host: '127.0.0.1'
    port: 32773
    database: 'test_api'
    autoReconnect: true

  test:
    driver: 'rethinkdb'
    host: '127.0.0.1'
    port: 32773
    database: 'test_api'
    autoReconnect: true
```

#### Create your lambda function

Create the function that will receive the events from the Api Gateway and pass it to Jambda.
To create an instance of Jambda, pass the path to your configuration file, and an array of models.

```javascript
export const handler = Jambda([path_to_the_configuration_file], [[FirstModel, SecondModel, ...]])
```

That is it for Jambda! Keep going for hints on the serverless configuration.

## Serverless

Here you find some examples on setting up the Serverless platform to deploy to AWS with just a couple of commands.

#### Install Serverless

The minimun you need is the serverless package, the serverless-wepack (if you are using webpack that is), and serverless-offline, to run it localy:

```
npm install -g serverless
```

```
npm install serverless-webpack serverless-offline --save
```

#### Create a serverless.yml

In the root of your project, create a file called `serverless.yml`, bellow is a simple example of
a serverless.yml file, for more options please refer to the [serverless docs](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).
**Remeber to replace the PROJECT_NAME & REGION placeholders with your own values:**

```yaml
service:
  name: PROJECT_NAME
  publish: false

plugins:
  - serverless-webpack
  - serverless-offline

provider:
  name: aws
  runtime: nodejs6.10                           // The node version, AWS Lambda only accepts nodejs 6.10 for now
  region: REGION                                // your AWS region name
  stage: ${opt:stage, 'development'}            // The stage options is important to identify development, staging and prod routes in the Api Gateway setup
  environment:
    NODE_ENV: ${opt:stage, 'development'}       // The env variable can be passed as an option to the cli or default to development
    SLS_DEBUG: true                             // Usefull in development for more detailed logs from serverless

functions:
  user:
    handler: src/index.handler                  // Path to the Lambda named handler
    events:                                     // Api Gateway HTTP events, will proxy all requests to the Jambda server
      - http: 'ANY /'
      - http: 'ANY /{proxy+}'
```

#### Run it localy

To simulate the Lambda/Api Gateway environment localy run:

```javascript
serverless offline
```

Done! You have your self a REST api for each of the models passed to the Jambda constructor running at `http://localhost:3000`

Each of the resources will have it's own named url:

```
http://localhost:3000/[resource_name]
```

## Deploy to AWS

Assuming you have your [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) set up, all you have to do is deploy your function using serverless-cli:

```javascript
serverless deploy
```

## REST Api

Once the server is up, you will have the following endpoints at your service:

##### NEW a Record

Get a new record from the server

> GET /[:resource_name]/new

**Response:**

* Success: {Object} A new unsaved record with all properties available in the model
* Error: {Object}

##### LIST Records

List all records from a resource

> GET /[resource_name]

**Response:**
A new unsaved record with all properties available in the model

##### GET a Record

Get an specific record by id

> GET /[:resource_name]/[:id]

##### COUNT Records

Count records from a resource

> GET /[resource_name]/count

##### POST a Record

Post a new record for a resource

> POST /[:resource_name]

##### PATCH a Record

Patch a record a record by id

> PATCH /[:resource_name]/[:id]

##### PUT a Record

Put a record on the datanase

> PUT /[:resource_name]

##### DELETE a Record

Delete a record by id

> DELETE /[:resource_name]/[:id]
