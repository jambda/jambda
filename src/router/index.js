import express from 'express'
import caminte from 'caminte';

import __get from './get'
import __post from './post'
import __put from './put'
import __patch from './patch'
import __delete from './delete'
import __new from './new'
import __count from './count'

const Schema = caminte.Schema;
const router = express.Router()

/**
 * Creates a new router with the provider prefix
 *
 * @param {Schema} model
 * @returns {express.Router}
 */
const create = (model) => {

    router.route('/new')
        .post(__new(model))

    router.route('/count')
        .get(__count(model))

    router.route('/:id')
        .get(__get(model))
        .put(__put(model))
        .patch(__patch(model))
        .delete(__delete(model));

    router.route('/')
        .post(__post(model))
        .get(__get(model));

    return router;
}

export default create;