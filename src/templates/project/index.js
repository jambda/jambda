import dotenv from 'dotenv'
dotenv.config()
import Jambda from 'jambda'

import userModel from './models/user.model'
import sourceModel from './models/source.model'

export const handler = Jambda('rethinkdb', [userModel, sourceModel])
