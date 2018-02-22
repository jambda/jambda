import {success} from '../helper/response'
import caminte from 'caminte'
const Schema = caminte.Schema
import * as repository from '../lib/repository'


/**
 * Counts the number of records in a model
 *
 * @param {Schema} model
 * @returns {Function}
 * @private
 */
const __count = (model) => {

    const count = repository.count(model);

    return (req, res, next) => {

        count()
            .then((response) => {
                success(200, response, res);
            })
            .catch(next);
    };
}

export default __count;