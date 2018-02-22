import caminte from 'caminte';
const Schema = caminte.Schema;
import promisify from './../helper/promisify'

const connect = (connector) => {

    let params;
    const config = require(`./connectors/${connector}.js`)

    switch(process.env.NODE_ENV) {
        case 'production':
            params = config.production();
            break;
        case 'test':
            params = config.test();
            break;
        default:
            params = config.development();
            break;
    }

    const schema = new Schema(params.driver, params)

    promisify(schema.autoupdate)

    return schema;
}

module.exports = connect