import database from '../config/database'


export const loadModel = (resource) => {
    return database.define(resource.name, resource.mappings,{});
}