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

    return ModelName;
})
```

Models are based on the [Ceminte Cross-Db ORM](https://github.com/biggora/caminte) package, they have an awesome model
creator that you can use to create your first model's. [Model Creator](http://www.camintejs.com/en/creator)

#### Create your lambda function

Create the function that will receive the events from the Api Gateway and pass it to Jambda.
To create an instance of Jambda, pass the connector name, currently one of: redis, rethinkdb,
mysqldb, mariadb, mongodb, arangodb, firebase, and an array of models.

```javascript
export const handler = Jambda([connector], [[FirstModel, SecondModel, ...]])
```

#### Create a serverless.yml

In the root of your project, create a file called `serverless.yml`, bellow is a simple example of
a serverless.yml file, for more options please refer to the [serverless docs](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

```yaml
service:
  name: {{PROJECT_NAME}}
  publish: false

plugins:
  - serverless-webpack
  - serverless-offline

provider:
  name: aws
  runtime: nodejs6.10
  region: {{REGION}}
  stage: dev
  environment:
    ${env:}

functions:
  user:
    handler: dist/handler
    events:
      - http: 'ANY /'
      - http: 'ANY /{proxy+}'
```

#### Deploy to AWS

Assuming you have your [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) set up, all you have to do is deploy your function using serverless-cli:

```javascript
serverless deploy
```

Done! You have your self a REST api for every single model you have passed in to Jambda!

## How to run it locally

To run your lambda REST api locally Jambda provides the offline command, to run it type on the console:

```javascript
npm offline
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
