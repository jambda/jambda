import _Object$assign from 'babel-runtime/core-js/object/assign'
import _Promise from 'babel-runtime/core-js/promise'
import fs from 'fs'
import path from 'path'
import cloneDeep from 'lodash/cloneDeep'
import kindOf from 'kind-of'
import yaml from 'yamljs'

/**
 * Pipe async functions
 *
 * @param {object} fns The fns
 * @returns {function(*=): *} The result
 */
export const pipe = (...fns) => x =>
    fns.reduce((prev, f) => prev.then(f), _Promise.resolve(x))

/**
 * Clones an object passing the new properties
 *
 * @param {Object} object The object to clone from
 * @param {Object} newObject The new propeties for the cloned object
 * @returns {Object} The new cloned object
 */
export const clone = (object, newObject = {}) =>
    _Object$assign({}, cloneDeep(object), newObject)

/**
 * Checks if a variable is a object\
 *
 * @param {String} type The type you expect the variable to be
 * @param {*} variable The variable to test the type
 * @param {*} expected If type matches what is the expected value
 * @returns {boolean} True if it matches false otherwise
 */
export const is = (type, variable, expected = undefined) => {
    const valid = kindOf(variable) === type

    if (valid && expected !== undefined) {
        return valid && variable === expected
    }

    return valid
}

/**
 * Load Yaml files from the file system
 *
 * @param {String} paths The path to the file
 * @returns {*} The loaded file as an native Object
 */
export const loadYaml = (...paths) =>
    yaml.parse(String(fs.readFileSync(path.join(...paths))))
