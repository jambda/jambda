import {badData} from 'boom';
import caminte from 'caminte'
const Schema = caminte.Schema


/**
 * Helper function to set the error response for invalid models
 *
 * @param {Schema} model
 * @param {Function} reject
 * @param {Function} callback
 */
const validate = (model, reject, callback) => {

    model.isValid((isValid) => {
        if (!isValid) {
            console.log(model.errors);
            return reject(badData('Invalid data provided, please verify and try again!', model.errors));
        }

        callback(model);
    })
}

export default validate;