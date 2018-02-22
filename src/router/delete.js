import {success, failure} from '../helper/response'
import caminte from 'caminte'
const Schema = caminte.Schema
import * as repository from '../lib/repository'


/**
 * Deletes a record from the database given it's id
 *
 * @param {Schema} model The current model
 * @returns {Function} An express-middleware
 */
const __delete = (model) => {

    const destroy = repository.destroy(model);

    return (req, res, next) => {

        destroy(req.params.id)
            .then(() => {
                success(204, null, res);
            })
            .catch(next);
    };
}

export default __delete;